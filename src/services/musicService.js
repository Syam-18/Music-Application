// services/musicService.js
import {
  doc,
  setDoc,
  arrayUnion,
  getDoc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "@/firebase.js";

// -------------------------------
// Like a song (store full song object)
// -------------------------------
export async function likeSong(song) {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  const userRef = doc(db, "users", user.uid);

  // Save full song object instead of just ID
  await setDoc(
    userRef,
    { likedSongs: arrayUnion(song) },
    { merge: true }
  );
}

// -------------------------------
// Get all liked songs
// -------------------------------
export async function getLikedSongs() {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data().likedSongs || [] : [];
}

// -------------------------------
// Create a new playlist (songs as full objects)
// -------------------------------
export async function createPlaylist(name, songs = []) {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  const playlistsRef = collection(db, "users", user.uid, "playlists");
  const docRef = await addDoc(playlistsRef, {
    name,
    songs,
    createdAt: serverTimestamp(),
  });

  return docRef.id; // return playlist ID
}

// -------------------------------
// Get all playlists
// -------------------------------
export async function getPlaylists() {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  const playlistsRef = collection(db, "users", user.uid, "playlists");
  const snap = await getDocs(playlistsRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// -------------------------------
// Add a song (full object) to a playlist
// -------------------------------
export async function addSongToPlaylist(playlistId, song) {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  const playlistRef = doc(db, "users", user.uid, "playlists", playlistId);

  await setDoc(
    playlistRef,
    { songs: arrayUnion(song) },
    { merge: true }
  );
}

// -------------------------------
// Get all songs from a specific playlist
// -------------------------------
export async function getPlaylistSongs(playlistId) {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  const playlistRef = doc(db, "users", user.uid, "playlists", playlistId);
  const snap = await getDoc(playlistRef);
  return snap.exists() ? snap.data().songs || [] : [];
}
