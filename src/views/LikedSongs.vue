<template>
  <div class="liked-songs-page">
    <!-- Header -->
    <div class="liked-songs-header">
      <div class="header-content">
        <div class="playlist-image">
          <div class="heart-icon">❤</div>
        </div>
        <div class="playlist-info">
          <span class="playlist-type">Playlist</span>
          <h1>Liked Songs</h1>
          <div class="playlist-meta">
            <span>{{ userRef?.displayName || 'User' }}</span>
            <span>•</span>
            <span>{{ liked.length }} songs</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="playlist-controls">
      <button class="play-button" @click="playAll" :disabled="liked.length === 0">▶</button>
      <button class="shuffle-button">🔀</button>
      <button class="more-button">⋮</button>
    </div>

    <!-- Songs Table -->
    <div class="songs-table">
      <div class="table-header">
        <div class="col-index">#</div>
        <div class="col-title">Title</div>
        <div class="col-album">Album</div>
        <div class="col-duration">⏱</div>
      </div>

      <div class="songs-list">
        <div
          v-for="(song, index) in liked"
          :key="song.id"
          class="song-row"
          @dblclick="playSong(song)"
        >
          <div class="col-index">
            <span class="track-number">{{ index + 1 }}</span>
          </div>
          <div class="col-title">
            <img :src="song.img || 'https://via.placeholder.com/40'" />
            <div class="song-info">
              <span class="song-title">{{ song.title }}</span>
              <span class="song-artist">{{ song.artist }}</span>
            </div>
          </div>
          <div class="col-album">{{ song.album?.name || '-' }}</div>
          <div class="col-duration">
            <button
              class="like-btn"
              :class="{ liked: liked.some((s) => s.id === song.id) }"
              @click.stop="toggleLike(song.id)"
            >
              ❤
            </button>
            <span class="duration">{{ song.duration || '3:00' }}</span>
          </div>
        </div>

        <div v-if="!loading && liked.length === 0" class="empty">💔 No liked songs yet</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase.js'
import { saveUserProfile } from '@/services/userService'
import { likeSong, unlikeSong, getLikedSongs } from '@/services/musicService'

const liked = ref([])
const loading = ref(true)
const userRef = ref(null)

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      userRef.value = user
      await saveUserProfile(user)
      liked.value = await getLikedSongs()
      console.log('Fetched liked songs:', liked.value)
    } catch (err) {
      console.error('Error fetching liked songs:', err)
    }
  } else {
    liked.value = []
    userRef.value = null
  }
  loading.value = false
})

async function toggleLike(songId) {
  try {
    const isLiked = liked.value.some((song) => song.id === songId)

    if (isLiked) {
      await unlikeSong(songId)
    } else {
      await likeSong(songId)
    }

    // Refresh liked list
    liked.value = await getLikedSongs()
  } catch (err) {
    console.error('Error liking/unliking:', err)
  }
}

function playAll() {
  if (liked.value.length > 0) {
    playSong(liked.value[0])
  }
}

function playSong(song) {
  console.log('Playing song:', song.title)
  // Hook into your global store/player here
}
</script>

<style scoped>
/* Page Layout */
.liked-songs-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #242424 0%, #000 100%);
  color: white;
  font-family: 'Poppins', 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

/* Header */
.liked-songs-header {
  background: linear-gradient(135deg, #450af5, #c4efd9);
  padding: 4rem 2rem 3rem;
  display: flex;
  align-items: flex-end;
}
.header-content {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
}
.playlist-image {
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, #1db954, #1ed760);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.heart-icon {
  font-size: 4rem;
  color: white;
}
.playlist-info {
  display: flex;
  flex-direction: column;
}
.playlist-type {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ddd;
}
.playlist-info h1 {
  font-size: 3rem;
  font-weight: 800;
  margin: 0.2rem 0;
}
.playlist-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #aaa;
  font-size: 0.95rem;
}

/* Controls */
.playlist-controls {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.5rem 2rem;
}
.play-button {
  background: #1db954;
  border: none;
  color: black;
  font-size: 2rem;
  font-weight: bold;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}
.play-button:hover {
  transform: scale(1.1);
}
.shuffle-button,
.more-button {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
}
.shuffle-button:hover,
.more-button:hover {
  color: white;
}

/* Table */
.songs-table {
  padding: 1rem 2rem;
}
.table-header {
  display: grid;
  grid-template-columns: 50px 3fr 2fr 100px;
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;
  font-size: 0.9rem;
  color: #bbb;
}
.songs-list {
  display: flex;
  flex-direction: column;
}
.song-row {
  display: grid;
  grid-template-columns: 50px 3fr 2fr 100px;
  align-items: center;
  padding: 0.6rem 0;
  border-radius: 6px;
  transition: background 0.2s;
}
.song-row:hover {
  background: rgba(255, 255, 255, 0.1);
}
.song-row img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 1rem;
}
.song-info {
  display: flex;
  flex-direction: column;
}
.song-title {
  font-size: 0.95rem;
  font-weight: 500;
}
.song-artist {
  font-size: 0.8rem;
  color: #aaa;
}
.like-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 1.2rem;
}
.like-btn.liked {
  color: #1db954;
}
.like-btn:hover {
  color: #1ed760;
}
.duration {
  margin-left: 0.5rem;
  font-size: 0.85rem;
  color: #aaa;
}

/* Empty state */
.empty {
  text-align: center;
  padding: 2rem;
  color: #bbb;
  font-style: italic;
}
</style>
