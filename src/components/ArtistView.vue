<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AlbumCard from './AlbumCard.vue'
import CardSkeletonLoading from './CardSkeletonLoading.vue'
const artist = ref({})
const topTracks = ref([])
const topAlbums = ref([])
const Route = useRoute()
const isAlbumsLoading = ref(true)

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
  return artists?.map((a) => a.name).join(', ') || 'Unknown'
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
  isAlbumsLoading.value = false
  // console.log('Artist albums:', data.items) // 🔥 Array of album objects
}
getArtistTopTracks(Route.params.id)
getArtistById(Route.params.id)
getArtistAlbums()
</script>
<template>
  <div
    class="bg-cover bg-no-repeat min-h-[50vh] w-full flex flex-col justify-end p-4 relative"
    :style="{ backgroundImage: `url(${artist.images[0].url})` }"
    v-if="artist.images && artist.images.length > 0"
  >
    <div class="z-2">
      <p class="text-6xl font-semibold ml-4" style="margin-bottom: 4px">{{ artist.name }}</p>
      <p class="text-[hsl(0,0%,80)] ml-4">
        {{ artist.followers.total.toLocaleString() }} followers
      </p>
    </div>
    <div class="bg-gradient-to-b from-transparent to-black/60 inset-0 z-1 absolute"></div>
    <img
      :src="artist.images[0].url"
      alt="artist.name"
      class="absolute w-[300px] h-[300px] top-4 right-4 shadow shadow-white"
    />
  </div>
  <div class="flex">
    <div class="p-4">
      <h1 class="text-3xl mt-4 mb-4 ml-4 pl-4 font-semibold">Popular</h1>
      <div v-for="(track, index) in topTracks.slice(0, 10)" :key="track.id">
        <RouterLink :to="`/track/${track.id}`" class="track-row ml-4 pr-2 pt-3 pb-3">
          <span class="track-number mr-2">{{ index + 1 }}</span>
          <img :src="track.album.images[0].url" alt="" class="w-8 h-8 mr-3 rounded-sm" />
          <div class="track-info">
            <p class="track-name">{{ track.name }}</p>
            <p class="track-artists">{{ getArtistNames(track.artists) }}</p>
          </div>
          <div class="track-actions">
            <span class="heart"> ♥ </span>
            <span class="track-duration">
              {{ formatDuration(track.duration_ms) }}
            </span>
          </div>
        </RouterLink>
      </div>
    </div>

  </div>
  <section class="mt-4">
    <h2 class="font-semibold text-2xl mb-2">Popular Albums</h2>

    <div
      v-if="isAlbumsLoading"
      class="gap-4 scroll-container flex flex-row overflow-x-scroll w-[83vw] m-10"
    >
      <CardSkeletonLoading v-for="n in 8" :key="n" />
    </div>
    <div class="gap-4 scroll-container flex flex-row overflow-x-scroll w-[83vw] m-10" v-else>
      <AlbumCard v-for="album in topAlbums" :key="album.id" :album="album" />
    </div>
  </section>
</template>
<style scoped>
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
  width: 50vw;
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
  font-size: 16px;
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
