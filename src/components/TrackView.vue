<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const track = ref({})
const Route = useRoute()
const likedTracks = ref([])

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
  console.log(track.value)
}
getTrack()
function msToMinSec(ms) {
  let totalSeconds = Math.floor(ms / 1000)
  let minutes = Math.floor(totalSeconds / 60)
  let seconds = totalSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

const toggleLike = (trackId) => {
  if (likedTracks.value.includes(trackId)) {
    likedTracks.value = likedTracks.value.filter((id) => id !== trackId)
  } else {
    likedTracks.value.push(trackId)
  }
}
</script>
<template>
  <div
    v-if="track && track.album"
    class="p-8 bg-[url('https://i.pinimg.com/1200x/a8/67/8e/a8678e6959187e63856eff5358995c7f.jpg')] bg-cover w-[100%] h-full"
  >
    <div class="h-[40vh] p-8 flex flex-col items-center gap-16">
      <img :src="track.album.images[0].url" alt="track.name" class="rounded-md h-full" />
      <div class="flex flex-col gap-5 self-start">
        <h1 class="text-6xl song-name">{{ track.name }}</h1>
        <div class="flex">
          <div class="flex gap-2 mr-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            <p>{{ track.album.artists[0].name }}</p>
          </div>
          <div class="flex gap-2 mr-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            <p>{{ track.album.name }}</p>
          </div>
          <p class="mr-4">{{ track.album.release_date.slice(0, 4) }}</p>
          <p class="mr-4">{{ msToMinSec(track.duration_ms) }}</p>
          <div class="flex gap-2 items-center">
            <i class="fa-solid fa-fire-flame-curved"></i>
            <p>{{ track.popularity }}</p>
          </div>
        </div>
        <div class="flex gap-2">
          <div
            v-for="genre in genres"
            class="border-[hsl(0,0%,50%)] border-2 rounded-3xl px-4py-2 self-start"
          >
            <p>{{ genre }}</p>
          </div>
        </div>
        <div class="flex items-center gap-5 mt-4">
          <div
            class="bg-[hsl(120,50%,50%)] p-4 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer"
          >
            <i class="fa-solid fa-play text-black"></i>
          </div>
          <span
            class="heart"
            :class="{ liked: likedTracks.includes(track.id) }"
            @click="toggleLike(track.id)"
          >
            ♥
          </span>
          <div class="border-[hsl(0,0%,50%)] border-2 relative cursor-pointer flex items-center justify-center z-4 ">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="bg-black">
              <path
                d="M12 5v14M5 12h14"
                stroke="#B0B0B0"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <div
              class="absolute -top-2 border-[hsl(0,0%,50%)] border-2 text-black inset-0 flex items-center justify-center text-xs z-3"></div>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <div v-for="artist in track.album.artists" class="hover:underline">
            <RouterLink :to="`/artist/${artist.id}`">
              <p class="text-lg font-semibold">{{ artist.name }}</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
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
  font-size: 32px;
  transition: color 0.2s;
}
.heart.liked {
  color: red;
}

</style>
