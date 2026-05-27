// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '../firebase'

const AuthContext = createContext(null)

// Helper for Mock DB operations
const getMockDB = () => {
  try {
    return JSON.parse(localStorage.getItem('famly_mock_users_db') || '{}')
  } catch (e) {
    return {}
  }
}
const saveMockDB = (db) => {
  localStorage.setItem('famly_mock_users_db', JSON.stringify(db))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined) // undefined = loading, null = logged out

  useEffect(() => {
    if (!isFirebaseConfigured) {
      // LocalStorage Mock mode
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
          console.error("Firestore user plan sync error:", e)
        }
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          plan
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
      if (!mockUser || mockUser.password !== password) {
        const err = new Error('Incorrect email or password.')
        err.code = 'auth/invalid-credential'
        throw err
      }
      const userSession = { uid: mockUser.uid, email: mockUser.email, displayName: mockUser.displayName, plan: mockUser.plan || 'STARTER' }
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
        console.error("Firestore fetch user plan error:", err)
      }
      setUser({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
        plan
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
      const uid = 'mock_' + Math.random().toString(36).substr(2, 9)
      const newUser = { uid, email: normalizedEmail, password, displayName: displayName || 'Family', plan }
      dbMock[normalizedEmail] = newUser
      saveMockDB(dbMock)

      const userSession = { uid, email: newUser.email, displayName: newUser.displayName, plan }
      localStorage.setItem('famly_mock_user', JSON.stringify(userSession))
      setUser(userSession)
      return { user: userSession }
    }

    return createUserWithEmailAndPassword(auth, email, password).then(async (cred) => {
      if (displayName) {
        await updateProfile(cred.user, { displayName })
      }
      try {
        await setDoc(doc(db, 'users', cred.user.uid), { plan })
      } catch (err) {
        console.error("Firestore set user plan error:", err)
      }
      setUser({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: displayName || cred.user.displayName,
        plan
      })
      return cred
    })
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
    <AuthContext.Provider value={{ user, login, register, logout, isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
