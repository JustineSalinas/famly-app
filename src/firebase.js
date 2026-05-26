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

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
