const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https')
const { setGlobalOptions } = require('firebase-functions/v2')
const admin = require('firebase-admin')
const https = require('https')
const crypto = require('crypto')

admin.initializeApp()
setGlobalOptions({ region: 'asia-southeast1' })

const PLAN_PRICE_IDS = {
  FAMILY: { php: 29900, usd: 500 },  // amounts in centavos / cents
  PRO:    { php: 69900, usd: 1200 },
}

// ─── createCheckoutSession ───────────────────────────────────────
// Callable from the frontend. Creates a PayMongo checkout session
// and returns the checkout URL.
exports.createCheckoutSession = onCall(async (request) => {
  const { plan, currency = 'PHP' } = request.data
  const uid = request.auth?.uid

  if (!uid) throw new HttpsError('unauthenticated', 'Must be signed in.')
  if (!['FAMILY', 'PRO'].includes(plan)) throw new HttpsError('invalid-argument', 'Invalid plan.')

  const secretKey = process.env.PAYMONGO_SECRET_KEY
  if (!secretKey) throw new HttpsError('internal', 'PayMongo secret key not configured.')

  const prices = PLAN_PRICE_IDS[plan]
  const amount = currency === 'USD' ? prices.usd : prices.php
  const currencyCode = currency === 'USD' ? 'USD' : 'PHP'

  const payload = JSON.stringify({
    data: {
      attributes: {
        billing: { name: 'Famly Subscriber' },
        line_items: [
          {
            currency: currencyCode,
            amount,
            description: `Famly ${plan} Plan — monthly`,
            name: `Famly ${plan}`,
            quantity: 1,
          },
        ],
        payment_method_types: ['gcash', 'maya', 'card', 'dob', 'brankas_bdo', 'brankas_landbank'],
        success_url: `${process.env.APP_URL || 'https://famly.app'}/app?upgraded=${plan}`,
        cancel_url: `${process.env.APP_URL || 'https://famly.app'}/#pricing`,
        metadata: { uid, plan },
      },
    },
  })

  const checkoutSession = await paymongoRequest('POST', '/v1/checkout_sessions', payload, secretKey)
  return { checkoutUrl: checkoutSession.data.attributes.checkout_url }
})

// ─── paymongoWebhook ──────────────────────────────────────────────
// HTTPS trigger that receives PayMongo webhook events and updates
// the user's plan in Firestore after a successful payment.
exports.paymongoWebhook = onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
    return
  }

  const webhookSecret = process.env.PAYMONGO_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('PAYMONGO_WEBHOOK_SECRET not set')
    res.status(500).send('Webhook secret not configured')
    return
  }

  // Verify PayMongo signature
  const sigHeader = req.headers['paymongo-signature']
  if (!sigHeader || !verifyPaymongoSignature(sigHeader, req.rawBody, webhookSecret)) {
    console.warn('Invalid PayMongo signature')
    res.status(400).send('Invalid signature')
    return
  }

  const event = req.body?.data
  const eventType = event?.attributes?.type

  if (eventType !== 'checkout_session.payment.paid') {
    res.status(200).send('Ignored')
    return
  }

  const metadata = event?.attributes?.data?.attributes?.metadata
  const uid = metadata?.uid
  const plan = metadata?.plan

  if (!uid || !['FAMILY', 'PRO'].includes(plan)) {
    console.warn('Webhook missing uid or plan in metadata', metadata)
    res.status(400).send('Missing metadata')
    return
  }

  await admin.firestore().doc(`users/${uid}`).set(
    { plan, planUpdatedAt: admin.firestore.FieldValue.serverTimestamp() },
    { merge: true }
  )

  console.log(`Plan updated: uid=${uid} plan=${plan}`)
  res.status(200).send('OK')
})

// ─── Helpers ──────────────────────────────────────────────────────

function verifyPaymongoSignature(sigHeader, rawBody, secret) {
  // sigHeader format: "t=<timestamp>,te=<test_sig>,li=<live_sig>"
  const parts = Object.fromEntries(sigHeader.split(',').map(p => p.split('=')))
  const timestamp = parts.t
  const receivedSig = parts.li || parts.te  // live sig preferred over test sig
  if (!timestamp || !receivedSig) return false

  const message = `${timestamp}.${rawBody}`
  const expected = crypto.createHmac('sha256', secret).update(message).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(receivedSig, 'hex'))
}

function paymongoRequest(method, path, body, secretKey) {
  return new Promise((resolve, reject) => {
    const encoded = Buffer.from(`${secretKey}:`).toString('base64')
    const options = {
      hostname: 'api.paymongo.com',
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encoded}`,
        'Content-Length': Buffer.byteLength(body),
      },
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          if (res.statusCode >= 400) reject(new Error(parsed.errors?.[0]?.detail || 'PayMongo API error'))
          else resolve(parsed)
        } catch (e) {
          reject(e)
        }
      })
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}
