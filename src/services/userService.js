// services/userService.js
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

/**
 * Saves or updates the authenticated user's profile in Firestore.
 * @param user - Firebase Auth user object
 */
export async function saveUserProfile(user) {
  if (!user?.uid) return

  try {
    const userRef = doc(db, 'users', user.uid)

    const data = {
      name: user.displayName || '',
      email: user.email || '',
      photoURL: user.photoURL || '',
      lastLogin: new Date(),
    }

    await setDoc(userRef, data, { merge: true })

    console.log('User profile saved/updated:', user.uid)
  } catch (error) {
    console.error('Error saving user profile:', error)
  }
}

