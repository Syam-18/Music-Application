<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '@/stores'
import ArtistCard from './ArtistCard.vue'
import CardSkeletonLoading from './CardSkeletonLoading.vue'
import AlbumCard from './AlbumCard.vue'

const route = useRoute()
const searchQuery = ref('')
const tracks = ref([])
const artists = ref([])
const albums = ref([])
const isAlbumsLoading = ref(true)
const isArtistsLoading = ref(true)
const areSongsLoading = ref(true)

watch(
  () => route.params.id,
  (newId) => {
    searchQuery.value = newId || ''
    console.log('Route param changed:', newId)
    getTracks(newId)
    getArtists(newId)
  },
)

onMounted(() => {
  searchQuery.value = route.params.id
  getTracks(route.params.id)
  getArtists(route.params.id)
  getAlbums(route.params.id)
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

const getTracks = async () => {
  let token = localStorage.getItem('accessToken')
  const expiry = localStorage.getItem('tokenExpiry')

  if (!token || Date.now() > expiry) {
    token = await getAccessToken()
  }

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery.value)}&type=track&limit=5`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  const data = await res.json()
  tracks.value = data.tracks.items
  areSongsLoading.value = false
}

const getArtists = async () => {
  let token = localStorage.getItem('accessToken')
  const expiry = localStorage.getItem('tokenExpiry')

  if (!token || Date.now() > expiry) {
    token = await getAccessToken()
  }

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${searchQuery.value}&type=artist&limit=15`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  const data = await res.json()
  artists.value = data.artists.items
  isArtistsLoading.value = false
}

const getAlbums = async () => {
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${searchQuery.value}&type=album&limit=15`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  const data = await res.json()
  albums.value = data.albums.items
  isAlbumsLoading.value = false
}

// const recentSearches = computed(() => store.recentSearches)

// const selectRecentSearch = (item) => {
//   searchQuery.value = item.name
//   addToRecent(item.name)
// }

// const removeRecentSearch = (id) => {
//   const index = store.recentSearches.findIndex((item) => item.id === id)
//   if (index > -1) store.recentSearches.splice(index, 1)
// }

// const addToRecent = (name) => {
//   const exists = store.recentSearches.find((item) => item.name === name)
//   if (!exists) {
//     store.recentSearches.unshift({ id: Date.now(), name })
//     if (store.recentSearches.length > 10) store.recentSearches.pop()
//   }
// }
</script>

<template>
  <div class="p-4 mt-4">
    <div class="flex gap-4 items-stretch mb-4" v-if="tracks.length || !areSongsLoading">
      <RouterLink :to="`/track/${tracks[0].id}`" class="no-underline w-[35%] self-stretch h-full hidden md:block">
        <div>
          <h1 class="font-semibold text-2xl mb-2">Top Result</h1>
          <div class="bg-[hsl(0,0%,8%)] hover:bg-[hsl(0,0%,15%)] p-4 text-white rounded-md">
            <img
              :src="tracks[0]?.album.images[0]?.url"
              alt="Album Cover"
              class="w-[30%] mb-4 rounded"
            />
            <h2 class="text-3xl font-bold truncate">{{ tracks[0].name }}</h2>
            <div class="flex items-center gap-2 truncate">
              <h1 class="text-[hsl(0,0%,60%)]">Song</h1>
              <p class="flex items-center">.</p>
              <router-link
                :to="`/artist/${artist.name}`"
                v-for="artist in tracks[0].album.artists"
                :key="artist.id"
                class="no-underline text-[hsl(0,0%,60%)] hover:underline"
              >
                <h1 class="font-bold tracking-wide hover:underline text-sm">{{ artist.name }}</h1>
              </router-link>
            </div>
          </div>
        </div>
      </RouterLink>

      <div class="grow">
        <h1 class="font-semibold text-2xl mb-2">Songs</h1>
        <div class="flex flex-col gap-1">
          <router-link :to="`/track/${track.id}`" v-for="track in tracks" id="track.id">
            <div class="flex items-center hover:bg-[hsl(0,0%,15%)] p-2 rounded-md text-white">
              <img :src="track.album.images[0].url" alt="Album Cover" class="w-10 inline mr-4" />
              <div class="flex flex-col">
                <h1>{{ track.name }}</h1>
                <div class="flex items-center gap-2"></div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex gap-4 items-stretch mb-4 animate-pulse" v-else>



  <!-- Top Result Skeleton -->
  <div class="no-underline w-[35%] self-stretch h-full hidden md:block">
    <div>
      <h1 class="font-semibold text-2xl mb-2">Top Result</h1>
      <div class="bg-[hsl(0,0%,8%)] p-4 rounded-md">
        <!-- Album cover -->
        <div class="w-[30%] h-28 bg-gray-700 rounded mb-4"></div>
        <!-- Title -->
        <div class="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
        <!-- Song + Artists -->
        <div class="flex items-center gap-2">
          <div class="h-4 w-10 bg-gray-700 rounded"></div>
          <div class="h-4 w-4 bg-gray-700 rounded"></div>
          <div class="h-4 w-16 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Songs Skeleton -->
  <div class="grow">
    <h1 class="font-semibold text-2xl mb-2">Songs</h1>
    <div class="flex flex-col gap-1">
      <div
        v-for="i in 5"
        :key="i"
        class="flex items-center p-2 rounded-md bg-[hsl(0,0%,8%)]"
      >
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
  </div>
</div>

    <div class="mt-4 mb-4">
      <h1 class="font-semibold text-2xl mb-2">Artists</h1>
      <div
        v-if="isArtistsLoading"
        class="md:gap-4 scroll-container flex flex-row overflow-x-scroll w-[90vw] md:w-[83vw] m-10"
      >
        <CardSkeletonLoading v-for="n in 8" :key="n" />
      </div>
      <div class="md:gap-4 scroll-container flex flex-row overflow-x-scroll w-[90vw] md:w-[83vw] m-10 " v-else>
        <ArtistCard
          v-for="artist in artists"
          :key="artist.id"
          :artist="{
            id: artist.id,
            name: artist.name,
            image: artist.images[0]?.url, // ✅ use Spotify image
          }"
        />
      </div>
    </div>
    <section class="mt-4">
      <h2 class="font-semibold text-2xl mb-2">Albums</h2>
      <div
        v-if="isAlbumsLoading"
        class="md:gap-4 scroll-container flex flex-row overflow-x-scroll w-[90vw] md:w-[83vw] m-10"
      >
        <CardSkeletonLoading v-for="n in 8" :key="n" />
      </div>
      <div class="md:gap-4 scroll-container flex flex-row overflow-x-scroll w-[90vw] md:w-[83vw] m-10" v-else>
        <AlbumCard v-for="album in albums" :key="album.id" :album="album" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #000;
  color: #fff;
}

.search-header {
  padding: 16px 24px;
}

.search-input-container input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 50px;
  border: none;
  background: #222;
  color: #fff;
}

.search-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.recent-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
}

.recent-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  cursor: pointer;
  background: #111;
  border-radius: 4px;
}

.remove-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
}

.no-results {
  text-align: center;
  padding: 48px;
  color: #b3b3b3;
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
