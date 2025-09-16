// services/userService.js
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

/**
 * Save or update the user's profile in Firestore.
 * Will create the document if it doesn't exist yet.
 */
export const saveUserProfile = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  const userData = {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    createdAt: serverTimestamp(), // ⬅ better than new Date()
  };

  // Create or merge the user profile
  await setDoc(userRef, userData, { merge: true });
};

/**
 * Save or update a playlist for a user.
 * Data should include full song objects, not just IDs.
 */
export const savePlaylist = async (userId, playlistId, data) => {
  if (!userId || !playlistId) return;

  const playlistRef = doc(db, "users", userId, "playlists", playlistId);

  // Always create if missing, update if exists
  await setDoc(playlistRef, data, { merge: true });
};

/**
 * Fetch a playlist safely.
 */
export const getPlaylist = async (userId, playlistId) => {
  if (!userId || !playlistId) return null;

  const playlistRef = doc(db, "users", userId, "playlists", playlistId);
  const snap = await getDoc(playlistRef);

  if (snap.exists()) {
    return snap.data();
  } else {
    return null;
  }
};
