// services/musicService.js
import { doc, updateDoc, arrayUnion, getDoc, collection, addDoc, getDocs } from 'firebase/firestore'
import { db, auth } from '@/firebase.js'

export async function likeSong(songId) {
  const userRef = doc(db, 'users', auth.currentUser.uid)
  await updateDoc(userRef, { likedSongs: arrayUnion(songId) })
}

export async function getLikedSongs() {
  const userRef = doc(db, 'users', auth.currentUser.uid)
  const snap = await getDoc(userRef)
  return snap.exists() ? snap.data().likedSongs || [] : []
}

export async function createPlaylist(name, songs = []) {
  const playlistsRef = collection(db, 'users', auth.currentUser.uid, 'playlists')
  await addDoc(playlistsRef, {
    name,
    songs,
    createdAt: new Date().toISOString(),
  })
}

export async function getPlaylists() {
  const playlistsRef = collection(db, 'users', auth.currentUser.uid, 'playlists')
  const snap = await getDocs(playlistsRef)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
