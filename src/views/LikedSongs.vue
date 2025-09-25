<template>
  <div class="liked-songs-page min-h-[150vh]">
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

    <!-- Songs Table -->
    <div class="songs-table">
      <div class="table-header">
        <div class="col-index">#</div>
        <div class="col-title text-center md:text-left">Title</div>
        <div class="col-album hidden md:block">Album</div>
        <div class="col-duration">⏱</div>
      </div>

      <!--skeleton Loader-->
      <div class="flex flex-col gap-1" v-if="loading">
        <div v-for="i in 5" :key="i" class="flex items-center p-2 rounded-md bg-[hsl(0,0%,8%)]">
          <!-- Album cover -->
          <div class="w-10 h-10 bg-gray-700 rounded mr-4"></div>
          <div class="flex flex-col gap-1">
            <!-- Song title -->
            <div class="h-4 w-40 bg-gray-700 rounded"></div>
            <!-- Small text -->
            <div class="h-3 w-24 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      <div class="songs-list" v-else>
        <div
          v-for="(song, index) in liked"
          :key="song.id"
          class="song-row cursor-pointer"
          @dblclick="playSong(song)"
          @click="router.push(`/track/${song.id}`)"
        >
          <div class="col-index">
            <span class="track-number">{{ index + 1 }}</span>
          </div>
          <div class="col-title flex items-center">
            <img
              :src="song.album?.images?.[0]?.url || 'https://via.placeholder.com/40'"
              class="w-4 h-4"
            />
            <div class="song-info">
              <span class="song-title text-sm truncate w-[20vw]">{{ song.name }}</span>
              <span
                class="song-artist hover:underline text-xs"
                @click.stop="router.push(`/artist/${song.album.artists[0].id}`)"
                >{{ song.album?.artists?.[0].name }}</span
              >
            </div>
          </div>
          <div class="col-album truncate text-xs hidden md:block">
            {{ song.album?.name || '-' }}
          </div>
          <div class="col-duration">
            <button
              class="like-btn"
              :class="{ liked: liked.some((s) => s.id === song.id) }"
              @click.stop="toggleLike(song)"
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
  <div v-if="showToast" class="toast">
    {{ toastMessage }}
    <span
      v-if="toastType === 'song'"
      @click="router.push('/liked-songs')"
      class="text-blue-400 cursor-pointer"
    >
      Liked Songs
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase.js'
import { saveUserProfile } from '@/services/userService'
import { likeSong, unlikeSong, getLikedSongs } from '@/services/musicService'
import router from '@/router'
defineProps({
  class: String,
})
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
  console.log(liked.value)
})

const toastMessage = ref('')
const showToast = ref(false)
const toastType = ref('')

function triggerToast(message, type) {
  toastMessage.value = message
  showToast.value = true
  toastType.value = type
  setTimeout(() => (showToast.value = false), 2000) // hides after 2s
}

async function toggleLike(song) {
  const isLiked = liked.value.some((likedSong) => likedSong.id === song.id)

  if (isLiked) {
    triggerToast('Removed from ', 'song')
    liked.value = liked.value.filter((likedSong) => likedSong.id !== song.id)
    await unlikeSong(song)
  } else {
    triggerToast('Added to ', 'song')
    liked.value = [...liked.value, song]
    await likeSong(song)
  }

  // Refresh liked list
  liked.value = await getLikedSongs()
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
  color: hsl(0, 0%, 80%);
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

@media screen and (max-width: 768px) {
  .songs-table {
    padding: 10px;
  }
}

.table-header {
  display: grid;
  grid-template-columns: 50px 3fr 2fr 100px;
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;
  font-size: 0.9rem;
  color: #bbb;
}
@media screen and (max-width: 768px) {
  .table-header {
    grid-template-columns: 15px 1fr 100px;
    padding: 0.5rem 5px;
  }
  .track-number {
    display: hidden;
  }
}
.songs-list {
  display: flex;
  flex-direction: column;
}
.song-row {
  display: grid;
  grid-template-columns: 50px 3fr 2fr 100px;
  align-items: center;
  padding: 0.6rem 10px;
  border-radius: 6px;
  transition: background 0.2s;
}

@media screen and (max-width: 768px) {
  .song-row {
    grid-template-columns: 15px 1fr 100px;
    padding: 0.5rem 5px;
  }
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
  font-weight: 500;
}
.song-artist {
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
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  background: white;
  color: hsl(0, 0%, 10%);
  padding: 5px 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  opacity: 0.95;
  transition: all 0.3s ease;
}
</style>
