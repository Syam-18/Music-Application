<script setup>
import { likeSong, unlikeSong, getLikedSongs } from '@/services/musicService'
import { usePlayerStore } from '@/stores/playerStore'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const track = ref({})
const Route = useRoute()
const likedTracks = ref([])
const loading = ref(true)
const playerStore = usePlayerStore()

const genres = ['Funk', 'Electronic music', 'Disco', 'Soft Rock', 'Progressive pop']
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
const getTrack = async () => {
  let token = localStorage.getItem('accessToken')

  token = await getAccessToken()

  const res = await fetch(`https://api.spotify.com/v1/tracks/${Route.params.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await res.json()
  track.value = data
  loading.value = false
  console.log(track.value)
}
getTrack()
function msToMinSec(ms) {
  let totalSeconds = Math.floor(ms / 1000)
  let minutes = Math.floor(totalSeconds / 60)
  let seconds = totalSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

const toastMessage = ref('')
const showToast = ref(false)

function triggerToast(message) {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => (showToast.value = false), 2000) // hides after 2s
}

const toggleLike = async (track) => {
  if (likedTracks.value.some((likedTrack) => likedTrack.id === track.id)) {
    likedTracks.value = likedTracks.value.filter((likedTrack) => likedTrack.id !== track.id)
    triggerToast('Removed from ')
    await unlikeSong(track)
  } else {
    likedTracks.value.push(track)
    triggerToast('Added to ')
    await likeSong(track)
  }
}

const playCurrentTrack = () => {
  if (track.value) {
    playerStore.playTrack(track.value)
  }
}

onMounted(async () => {
  await getTrack()
  likedTracks.value = await getLikedSongs() // 👈 sync with Firestore
})
</script>
<template>
  <!-- Skeleton Loader -->
  <div
    v-if="loading"
    class="p-4 w-full h-full flex flex-col items-center bg-[hsl(0,0%,10%)] min-h-[150vh]"
  >
    <div
      class="rounded-2xl w-[90vw] md:w-[20vw] h-[40vh] animate-pulse bg-[hsl(0,0%,20%)] mb-8 mt-4 hidden md:block"
    ></div>
    <div class="md:h-[40vh] w-[95vw] p-4 flex flex-col items-center gap-16 animate-pulse">
      <!-- Album Image -->
      <div class="rounded-md md:h-full w-full md:w-auto bg-[hsl(0,0%,20%)] h-[300px]"></div>

      <div class="flex flex-col gap-5 self-start w-full">
        <!-- Song Title -->
        <div class="h-8 w-1/6 bg-[hsl(0,0%,20%)] rounded"></div>

        <!-- Artist / Album / Details -->
        <div class="flex gap-4 flex-wrap">
          <div class="h-4 w-24 bg-[hsl(0,0%,20%)] rounded"></div>
          <div class="h-4 w-32 bg-[hsl(0,0%,20%)] rounded"></div>
          <div class="h-4 w-12 bg-[hsl(0,0%,20%)] rounded"></div>
          <div class="h-4 w-16 bg-[hsl(0,0%,20%)] rounded"></div>
        </div>

        <!-- Genres -->
        <div class="flex gap-2 flex-wrap mt-4">
          <div class="h-6 w-20 bg-[hsl(0,0%,20%)] rounded-full"></div>
          <div class="h-6 w-20 bg-[hsl(0,0%,20%)] rounded-full"></div>
          <div class="h-6 w-20 bg-[hsl(0,0%,20%)] rounded-full"></div>
        </div>

        <!-- Artist List -->
        <div class="flex flex-col gap-2 mt-6">
          <div class="h-5 w-40 bg-[hsl(0,0%,20%)] rounded"></div>
          <div class="h-5 w-36 bg-[hsl(0,0%,20%)] rounded"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- real code -->
  <div
    v-else
    v-if="track && track.album"
    class="p-8 bg-[url('https://i.pinimg.com/1200x/a8/67/8e/a8678e6959187e63856eff5358995c7f.jpg')] bg-cover w-[100%] min-h-[150vh] flex flex-col items-center"
  >
    <div class="md:h-[40vh] w-[95vw] p-8 flex flex-col items-center gap-16">
      <img
        :src="track.album.images[0].url"
        alt="track.name"
        class="rounded-md md:h-full w-full md:w-auto"
      />
      <div class="flex flex-col gap-5 self-start">
        <h1 class="text-3xl md:text-6xl song-name">{{ track.name }}</h1>
        <div class="flex items-center gap-2 md:gap-4 flex-wrap">
          <div class="flex gap-2 mr-2 md:mr-4" style="margin-right: 20px">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="hidden md:flex">
              <circle cx="8" cy="7" r="2" stroke="#B0B0B0" stroke-width="1.5" />
              <path
                d="M6 16c0-3 2.5-5 5-5s5 2 5 5"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M17 11v5a2 2 0 1 0 4 0v-3"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <p
              @click="router.push(`/artist/${track.album.artists[0].id}`)"
              class="cursor-pointer hover: text-xs md:text-[16px]"
            >
              {{ track.album.artists[0].name }}
            </p>
          </div>
          <div class="flex gap-2 mr-2 md:mr-4 items-center" style="margin-right: 20px">
            <div class="w-5 h-5 rounded-full border-1 flex justify-center items-center">
              <div class="w-3 h-3 rounded-full border-2"></div>
            </div>
            <p
              class="text-xs md:text-[16px] cursor-pointer"
              @click.stop="router.push(`/album/${track.album.id}`)"
            >
              {{ track.album.name }}
            </p>
          </div>
          <p class="mr-2 md:mr-4 text-xs md:text-[16px]">
            {{ track.album.release_date.slice(0, 4) }}
          </p>
          <p class="mr-2 md:mr-4 text-xs md:text-[16px]">{{ msToMinSec(track.duration_ms) }}</p>
          <div class="gap-2 items-center hidden md:flex">
            <i class="fa-solid fa-fire-flame-curved text-xs md:text-[16px]"></i>
            <p class="text-xs md:text-[16px]">{{ track.popularity }}</p>
          </div>
        </div>
        <div class="flex md:hidden items-center gap-5 mt-4">
          <div
            @click="playCurrentTrack"
            class="bg-[hsl(120,50%,50%)] p-4 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer"
          >
            <i class="fa-solid fa-play text-black"></i>
          </div>
          <span
            class="heart"
            :class="{ liked: likedTracks.some((likedTrack) => likedTrack.id === track.id) }"
            @click="toggleLike(track)"
          >
            <i class="fa-solid fa-heart"></i>
          </span>
          <!-- <div
            class="border-[hsl(0,0%,50%)] border-2 relative cursor-pointer flex items-center justify-center z-4"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="bg-black">
              <path
                d="M12 5v14M5 12h14"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <div
              class="absolute -top-2 border-[hsl(0,0%,50%)] border-2 text-black inset-0 flex items-center justify-center text-xs z-3"
            ></div>
          </div> -->
        </div>
        <div class="flex gap-2 flex-wrap md:flex-nowrap">
          <div
            v-for="genre in genres"
            :key="genre"
            class="border-[hsl(0,0%,50%)] border-2 rounded-3xl px-4py-2 self-start"
          >
            <p class="text-xs md:text-[16px]">{{ genre }}</p>
          </div>
        </div>
        <div class="items-center gap-5 mt-4 hidden md:flex">
          <div
            @click="playCurrentTrack"
            class="bg-[hsl(120,50%,50%)] p-4 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer"
          >
            <i class="fa-solid fa-play text-black"></i>
          </div>
          <span
            class="heart text-xl md:text-2xl"
            :class="{ liked: likedTracks.some((likedTrack) => likedTrack.id === track.id) }"
            @click="toggleLike(track)"
          >
            <i class="fa-solid fa-heart"></i>
          </span>
          <!-- <div
            class="border-[hsl(0,0%,50%)] border-2 relative cursor-pointer flex items-center justify-center z-4"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="bg-black">
              <path
                d="M12 5v14M5 12h14"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <div
              class="absolute -top-2 border-[hsl(0,0%,50%)] border-2 text-black inset-0 flex items-center justify-center text-xs z-3"
            ></div>
          </div> -->
        </div>
        <div class="flex flex-col gap-1">
          <div v-for="artist in track.album.artists" :key="artist.id" class="hover:underline">
            <RouterLink :to="`/artist/${artist.id}`">
              <p class="text-lg font-semibold w-[200px]">{{ artist.name }}</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showToast" class="toast">
    {{ toastMessage }}
    <span @click="router.push('/liked-songs')" class="text-blue-400 cursor-pointer"
      >Liked Songs</span
    >
  </div>
</template>
<style scoped>
.p-8 {
  padding: 20px;
}
.px-4py-2 {
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.mr-4 {
  margin-right: 16px;
}
.heart {
  cursor: pointer;
  color: #888;
  transition: color 0.2s;
}
.heart.liked {
  color: red;
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
