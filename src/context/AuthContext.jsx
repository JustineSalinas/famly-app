// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '../firebase'

const AuthContext = createContext(null)

// ── Mock DB helpers ────────────────────────────────────────────
const getMockDB = () => {
  try {
    return JSON.parse(localStorage.getItem('famly_mock_users_db') || '{}')
  } catch (e) {
    return {}
  }
}
const saveMockDB = (data) => {
  localStorage.setItem('famly_mock_users_db', JSON.stringify(data))
}

// Simple hash for mock mode — not cryptographic, just avoids plaintext.
// Production uses Firebase Auth which handles hashing server-side.
async function hashPassword(password) {
  const msgBuffer = new TextEncoder().encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

async function verifyPassword(password, hash) {
  return (await hashPassword(password)) === hash
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined) // undefined = loading, null = logged out

  useEffect(() => {
    if (!isFirebaseConfigured) {
      const savedUser = localStorage.getItem('famly_mock_user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (e) {
          setUser(null)
        }
      } else {
        setUser(null)
      }
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let plan = 'STARTER'
        try {
          const docRef = doc(db, 'users', firebaseUser.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            plan = docSnap.data().plan || 'STARTER'
          }
        } catch (e) {
          console.error('Firestore user plan sync error:', e)
        }
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          emailVerified: firebaseUser.emailVerified,
          plan,
        })
      } else {
        setUser(null)
      }
    })
    return unsubscribe
  }, [])

  const login = async (email, password) => {
    if (!isFirebaseConfigured) {
      const dbMock = getMockDB()
      const normalizedEmail = email.toLowerCase().trim()
      const mockUser = dbMock[normalizedEmail]
      if (!mockUser) {
        const err = new Error('Incorrect email or password.')
        err.code = 'auth/invalid-credential'
        throw err
      }
      const valid = await verifyPassword(password, mockUser.passwordHash)
      if (!valid) {
        const err = new Error('Incorrect email or password.')
        err.code = 'auth/invalid-credential'
        throw err
      }
      const userSession = {
        uid: mockUser.uid,
        email: mockUser.email,
        displayName: mockUser.displayName,
        plan: mockUser.plan || 'STARTER',
      }
      localStorage.setItem('famly_mock_user', JSON.stringify(userSession))
      setUser(userSession)
      return { user: userSession }
    }

    return signInWithEmailAndPassword(auth, email, password).then(async (cred) => {
      let plan = 'STARTER'
      try {
        const docRef = doc(db, 'users', cred.user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          plan = docSnap.data().plan || 'STARTER'
        }
      } catch (err) {
        console.error('Firestore fetch user plan error:', err)
      }
      setUser({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
        emailVerified: cred.user.emailVerified,
        plan,
      })
      return cred
    })
  }

  const register = async (email, password, displayName, plan = 'STARTER') => {
    if (!isFirebaseConfigured) {
      const dbMock = getMockDB()
      const normalizedEmail = email.toLowerCase().trim()
      if (dbMock[normalizedEmail]) {
        const err = new Error('An account with this email already exists.')
        err.code = 'auth/email-already-in-use'
        throw err
      }
      const uid = 'mock_' + crypto.randomUUID().replace(/-/g, '').slice(0, 12)
      const passwordHash = await hashPassword(password)
      const newUser = {
        uid,
        email: normalizedEmail,
        passwordHash,
        displayName: displayName || 'Family',
        plan,
      }
      dbMock[normalizedEmail] = newUser
      saveMockDB(dbMock)

      const userSession = { uid, email: newUser.email, displayName: newUser.displayName, plan }
      localStorage.setItem('famly_mock_user', JSON.stringify(userSession))
      setUser(userSession)
      return { user: userSession }
    }

    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      await updateProfile(cred.user, { displayName })
    }

    // Send verification email before writing to Firestore so the user
    // gets the email even if the Firestore write fails.
    try {
      await sendEmailVerification(cred.user)
    } catch (err) {
      console.error('sendEmailVerification error:', err)
    }

    let resolvedPlan = 'STARTER'
    try {
      await setDoc(doc(db, 'users', cred.user.uid), { plan })
      resolvedPlan = plan
    } catch (err) {
      console.error('Firestore set user plan error:', err)
    }

    setUser({
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: displayName || cred.user.displayName,
      emailVerified: false,
      plan: resolvedPlan,
    })
    return cred
  }

  const resendVerification = async () => {
    if (!isFirebaseConfigured || !auth.currentUser) return
    await sendEmailVerification(auth.currentUser)
  }

  const logout = async () => {
    if (!isFirebaseConfigured) {
      localStorage.removeItem('famly_mock_user')
      setUser(null)
      return
    }
    return signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, resendVerification, isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
