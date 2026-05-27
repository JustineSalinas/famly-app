// src/firebase.js
// ──────────────────────────────────────────────────────────────
// Replace the placeholder values below with your actual Firebase
// project config from:
//   Firebase Console → Project Settings → Your apps → SDK setup
// ──────────────────────────────────────────────────────────────
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || 'PASTE_API_KEY_HERE',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || 'PASTE_AUTH_DOMAIN_HERE',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || 'PASTE_PROJECT_ID_HERE',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || 'PASTE_STORAGE_BUCKET_HERE',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'PASTE_SENDER_ID_HERE',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || 'PASTE_APP_ID_HERE',
}

const configKeysPresent = !!(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'your_api_key_here' &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'PASTE_API_KEY_HERE'
)

let app;
let auth;
let db;
let isFirebaseConfigured = false;

if (configKeysPresent) {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    isFirebaseConfigured = !!(auth && db)
  } catch (err) {
    console.error("Firebase initialization failed:", err)
  }
}

export { auth, db, isFirebaseConfigured }
export default app

