<script setup>
import { ref, onMounted } from 'vue'
import {
  likeSong,
  unlikeSong,
  getLikedSongs,
  addArtistToArtists,
  removeArtistFromArtists,
  getArtists,
} from '@/services/musicService'
import { useRoute } from 'vue-router'
import AlbumCard from './AlbumCard.vue'
import CardSkeletonLoading from './CardSkeletonLoading.vue'
import router from '@/router'
const artist = ref({})
const topTracks = ref([])
const topAlbums = ref([])
const Route = useRoute()
const likedTracks = ref([])
const followingArtists = ref([])
const toastMessage = ref('')
const toastType = ref('')

const showToast = ref(false)

function triggerToast(message, type) {
  toastMessage.value = message
  showToast.value = true
  toastType.value = type
  setTimeout(() => (showToast.value = false), 2000) // hides after 2s
}

const isAlbumsLoading = ref(true)
const isArtistLoading = ref(true)

const toggleArtist = async (artistId) => {
  if (followingArtists.value.includes(artistId)) {
    followingArtists.value = followingArtists.value.filter((Id) => Id !== artistId)
    triggerToast('Removed from ', 'artist')
    await removeArtistFromArtists(artistId)
  } else {
    followingArtists.value.push(artistId)
    triggerToast('Added to ', 'artist')
    await addArtistToArtists(artistId)
  }
}

const toggleLike = async (track) => {
  if (likedTracks.value.some((likedTrack) => likedTrack.id === track.id)) {
    likedTracks.value = likedTracks.value.filter((likedTrack) => likedTrack.id !== track.id)
    triggerToast('Removed from ', 'song')
    await unlikeSong(track)
  } else {
    likedTracks.value.push(track)
    triggerToast('Added to ', 'song')
    await likeSong(track)
  }
}
onMounted(async () => {
  await getArtistById(Route.params.id)
  await getArtistTopTracks(Route.params.id)
  await getArtistAlbums()
  likedTracks.value = await getLikedSongs() // 👈 sync with Firestore
  followingArtists.value = await getArtists()
  console.log(followingArtists.value)
})

const getAccessToken = async () => {
  const url = 'https://accounts.spotify.com/api/token'
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: '138c665e559f48ecb1bfe23378edfff9',
      client_secret: '193754eb82e0496ab5236eec396c12b5',
      grant_type: 'client_credentials',
    }),
  }

  const response = await fetch(url, options)
  const data = await response.json()

  localStorage.setItem('accessToken', data.access_token)
  localStorage.setItem('tokenExpiry', Date.now() + data.expires_in * 1000)

  return data.access_token
}
const getArtistNames = (artists) => {
  return (
    artists
      .slice(0, 2)
      ?.map((a) => a.name)
      .join(', ') || 'Unknown'
  )
}
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}
const getArtistById = async (id) => {
  let token = localStorage.getItem('accessToken')
  const expiry = localStorage.getItem('tokenExpiry')

  if (!token || Date.now() > expiry) {
    token = await getAccessToken()
  }

  const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await res.json()
  artist.value = data
  isArtistLoading.value = false
  // console.log('Artist details:', data) // 🔥 Full artist object
  return data
}
const getArtistTopTracks = async (id, market = 'US') => {
  // Reuse token logic
  let token = localStorage.getItem('accessToken')
  const expiry = localStorage.getItem('tokenExpiry')

  if (!token || Date.now() > expiry) {
    token = await getAccessToken()
  }

  // Fetch top tracks
  const res = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=${market}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await res.json()
  topTracks.value = data.tracks // Spotify returns { tracks: [...] }
  // console.log('Artist top tracks:', data.tracks) // 🔥 Array of track objects
  console.log(topTracks.value)
  return data.tracks
}

const getArtistAlbums = async () => {
  let token = localStorage.getItem('accessToken')
  const expiry = localStorage.getItem('tokenExpiry')

  if (!token || Date.now() > expiry) {
    token = await getAccessToken()
  }

  const res = await fetch(`https://api.spotify.com/v1/artists/${Route.params.id}/albums`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await res.json()
  topAlbums.value = data.items
  isArtistLoading.value = false
  isAlbumsLoading.value = false
  // console.log('Artist albums:', data.items) // 🔥 Array of album objects
}
</script>
<template>
  <div
    class="relative flex flex-col items-center bg-[hsl(0,0%,10%)] w-full h-[50vh] animate-pulse"
    v-if="isArtistLoading"
  >
    <div class="bottom-0 left-0 absolute p-4">
      <div class="bg-[hsl(0,0%,20%)] rounded w-[100px] h-[25px] animate-pulse mb-2"></div>
      <div class="bg-[hsl(0,0%,20%)] rounded w-[150px] h-[25px] animate-pulse"></div>
    </div>
    <div
      class="absolute top-4 right-4 w-[20%] aspect-square bg-[hsl(0,0%,20%)] animate-pulse hidden md:block"
    ></div>
  </div>
  <div
    class="relative flex flex-col justify-end bg-cover bg-no-repeat p-4 w-full min-h-[50vh]"
    :style="{ backgroundImage: `url(${artist.images[0].url})` }"
    v-if="artist.images && artist.images.length > 0"
  >
    <div class="z-2">
      <p class="text-shadow-2xs ml-4 font-semibold text-4xl md:text-6xl" style="margin-bottom: 4px">
        {{ artist.name }}
      </p>
      <div class="flex gap-4">
        <p class="text-shadow-2xs ml-4 text-[hsl(0,0%,80)]">
          {{ artist.followers.total.toLocaleString() }} followers
        </p>
        <button
          @click="toggleArtist(artist.id)"
          class="border-2 border-[hsl(0,0%,70%)] pl-2 pr-2 rounded-md cursor-pointer text-sm"
          :class="{'bg-[hsl(120,60%,50%)] border-none text-black' : followingArtists.includes(artist.id)}"
        >
          {{ followingArtists.includes(artist.id) ? 'Following' : 'Follow' }}
        </button>
      </div>
    </div>
    <div class="z-1 absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
    <img
      :src="artist.images[0].url"
      alt="artist.name"
      class="hidden top-4 right-4 absolute md:flex shadow shadow-white w-[300px] h-[300px]"
    />
  </div>

  <div class="flex mb-4">
    <div class="p-4">
      <h1 class="mt-4 mb-4 md:ml-4 pl-4 font-semibold text-2xl md:text-3xl">Popular</h1>
      <div class="grow" v-if="isArtistLoading">
        <div class="flex flex-col gap-1 md:w-[70vw] w-[100vw]">
          <div
            v-for="i in 10"
            :key="i"
            class="flex items-center p-2 rounded-md mb-4 bg-[hsl(0,0%,8%)]"
          >
            <!-- Album cover -->
            <div class="h-10 bg-gray-700 rounded mr-4"></div>
            <div class="flex flex-col gap-1">
              <!-- Song title -->
              <div class="h-4 w-40 bg-gray-700 rounded"></div>
              <!-- Small text -->
              <div class="h-3 w-24 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-for="(track, index) in topTracks.slice(0, 10)" :key="track.id">
        <RouterLink :to="`/track/${track.id}`" class="md:ml-4 pt-3 pr-2 pb-3 track-row">
          <span class="md:mr-2 md:text-[16px] text-xs track-number">{{ index + 1 }}</span>
          <img
            :src="track.album.images[0].url"
            alt=""
            class="mr-3 rounded-sm w-6 md:w-8 h-6 md:h-8"
          />
          <div class="track-info">
            <p class="w-[50vw] md:w-auto truncate track-name">{{ track.name }}</p>
            <p class="w-[50vw] md:w-auto track-artists trunacte">
              {{ getArtistNames(track.artists) }}
            </p>
          </div>
          <div class="track-actions">
            <span
              class="text-xl md:text-2xl heart"
              @click.stop.prevent="toggleLike(track)"
              :class="{ liked: likedTracks.some((likedTrack) => likedTrack.id === track.id) }"
            >
              <i class="fa-solid fa-heart"></i>
            </span>
            <span class="track-duration">
              {{ formatDuration(track.duration_ms) }}
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
  <section class="mt-4 mb-4 ml-4 md:ml-0">
    <h2 class="mb-2 font-semibold text-xl md:text-2xl">Popular Albums</h2>

    <div
      v-if="isAlbumsLoading"
      class="flex flex-row gap-4 w-[83vw] overflow-x-scroll scroll-container"
    >
      <CardSkeletonLoading v-for="n in 8" :key="n" />
    </div>
    <div
      class="flex flex-row md:gap-4 w-[90vw] md:w-[83vw] overflow-x-scroll scroll-container"
      v-else
    >
      <AlbumCard v-for="album in topAlbums" :key="album.id" :album="album" />
    </div>
  </section>
  <div v-if="showToast" class="toast">
    {{ toastMessage }}
    <span
      v-if="toastType === 'song'"
      @click="router.push('/liked-songs')"
      class="text-blue-400 cursor-pointer"
    >
      Liked Songs
    </span>
    <span
      v-else-if="toastType === 'artist'"
      @click="router.push('/following-artists')"
      class="text-blue-400 cursor-pointer"
    >
      Artists
    </span>
  </div>
</template>

<style scoped>
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

@media screen and (max-width: 768px) {
  .toast {
    left: 0;
    bottom: 3rem;
  }
}

.track-list {
  margin-top: 16px;
}
.track-header {
  display: flex;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 12px;
}
.track-row {
  display: flex;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  width: 70vw;
}

@media screen and (max-width: 768px) {
  .track-row {
    width: 90vw;
  }
}

.track-row:hover {
  background-color: hsl(0, 0%, 20%);
}
.track-row:hover .track-name {
  text-decoration: underline;
  color: hsl(120, 100%, 80%);
}
.track-number {
  width: 32px;
  flex-shrink: 0;
  text-align: center;
}
.track-info {
  flex: 1;
}
.track-name {
  font-weight: 500;
}
.track-artists {
  font-size: 12px;
  color: #aaa;
}
.track-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.heart {
  cursor: pointer;
  color: #888;
  transition: color 0.2s;
}
.heart.liked {
  color: red;
}
.track-duration {
  width: 60px;
  text-align: right;
  color: #aaa;
  font-size: 14px;
}

@media (max-width: 768px) {
  .track-duration {
    width: 20px;
  }
}

.scroll-container {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  /* smooth scrolling on touchpads */

  /* Hide scrollbar for WebKit browsers */
}

.scroll-container::-webkit-scrollbar {
  display: none;
  /* Safari & Chrome */
}
</style>
