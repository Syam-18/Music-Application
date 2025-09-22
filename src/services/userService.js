// services/userService.js
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'

/**
 * Save or update the user's profile in Firestore.
 * Will create the document if it doesn't exist yet.
 */
export const saveUserProfile = async (user) => {
  if (!user) return

  const userRef = doc(db, 'users', user.uid)

  const userData = {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    createdAt: serverTimestamp(), // ⬅ better than new Date()
  }

  // Create or merge the user profile
  await setDoc(userRef, userData, { merge: true })
}
