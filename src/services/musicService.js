// services/musicService.js
import { doc, setDoc, arrayUnion, getDoc, collection, getDocs } from 'firebase/firestore'
import { db, auth } from '@/firebase.js'

// -------------------------------
// Like a song (store full song object)
// -------------------------------
export async function likeSong(song) {
  const user = auth.currentUser
  if (!user) throw new Error('No authenticated user found')

  const userRef = doc(db, 'users', user.uid)

  // Save full song object instead of just ID
  await setDoc(userRef, { likedSongs: arrayUnion(song) }, { merge: true })
}

// -------------------------------
// Unlike a song (remove full song object)
// -------------------------------
export async function unlikeSong(song) {
  const user = auth.currentUser
  if (!user) throw new Error('No authenticated user found')

  const userRef = doc(db, 'users', user.uid)
  const snap = await getDoc(userRef)
  if (!snap.exists()) return

  const likedSongs = snap.data().likedSongs || []
  const updatedSongs = likedSongs.filter((s) => s.id !== song.id)

  await setDoc(userRef, { likedSongs: updatedSongs }, { merge: true })
}

// -------------------------------
// Get all liked songs
// -------------------------------
export async function getLikedSongs() {
  const user = auth.currentUser
  if (!user) throw new Error('No authenticated user found')

  const userRef = doc(db, 'users', user.uid)
  const snap = await getDoc(userRef)
  return snap.exists() ? snap.data().likedSongs || [] : []
}

// // -------------------------------
// // Create a new playlist (songs as full objects)
// // -------------------------------
// export async function createPlaylist(name, songs = []) {
//   const user = auth.currentUser
//   if (!user) throw new Error('No authenticated user found')

//   const playlistsRef = collection(db, 'users', user.uid, 'playlists')
//   const docRef = await addDoc(playlistsRef, {
//     name,
//     songs,
//     createdAt: serverTimestamp(),
//   })

//   return docRef.id // return playlist ID
// }

export async function addAlbumToAlbums(album) {
  const user = auth.currentUser
  if (!user) throw new Error('No authenticated user found')

  const userRef = doc(db, 'users', user.uid)

  // Save full album object
  // Using a separate field 'likedAlbums' to keep it distinct from 'likedSongs'
  await setDoc(userRef, { likedAlbums: arrayUnion(album) }, { merge: true })
}

// -------------------------------
// Unlike an album (remove full album object)
// -------------------------------
export async function removeAlbumFromAlbums(albumId) {
  const user = auth.currentUser
  if (!user) throw new Error('No authenticated user found')

  const userRef = doc(db, 'users', user.uid)
  const snap = await getDoc(userRef)
  if (!snap.exists()) return // No document or no liked albums to remove

  const likedAlbums = snap.data().likedAlbums || []
  // Filter out the album with the matching ID
  const updatedAlbums = likedAlbums.filter((a) => a !== albumId)

  await setDoc(userRef, { likedAlbums: updatedAlbums }, { merge: true })
}

// -------------------------------
// Get all liked albums
// -------------------------------
export async function getAlbums() {
  const user = auth.currentUser
  if (!user) throw new Error('No authenticated user found')

  const userRef = doc(db, 'users', user.uid)
  const snap = await getDoc(userRef)
  // Return the likedAlbums array, or an empty array if not found
  return snap.exists() ? snap.data().likedAlbums || [] : []
}
