import { useState, useEffect } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

export function useSyncedState(key, defaultValue) {
  const { user } = useAuth()
  const [state, setState] = useState(defaultValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const docRef = doc(db, 'users', user.uid, 'dashboardData', key)
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setState(docSnap.data().value)
        } else {
          setState(defaultValue)
        }
        setLoading(false)
      },
      (err) => {
        console.error(`Firestore sync error for key ${key}:`, err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user, key])

  const updateState = async (newValue) => {
    if (!user) return
    const docRef = doc(db, 'users', user.uid, 'dashboardData', key)
    try {
      await setDoc(docRef, { value: newValue })
    } catch (err) {
      console.error(`Firestore write error for key ${key}:`, err)
    }
  }

  return [state, updateState, loading]
}
