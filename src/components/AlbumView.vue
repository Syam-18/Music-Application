<template>
  <div class="spotify-page">
    <!-- Blurred Background -->
    <div></div>

    <!-- Content -->
    <div class="content">
      <!-- Left Section -->
      <div class="left-section">
        <!-- Album Header -->
        <div class="album-header flex">
          <div class="w-[70vw] md:w-auto pt-4">
            <h1 class="album-title text-xl md:text-3xl">{{ album?.name || 'Unknown Album' }}</h1>
            <p class="album-meta text-xs md:text-[14px]">
              {{ getArtistNames(album?.artists) }} •
              {{ album?.release_date?.slice(0, 4) || '----' }} • {{ tracks.length }} songs •
              {{ totalDuration }}
            </p>
            <div class="featured-artists md:hidden" v-if="featuredArtists.length">
              <ul>
                <li
                  v-for="artist in featuredArtists"
                  :key="artist.id"
                  class="artist-row hover:underline cursor-pointer"
                  @click="router.push(`/artist/${artist.id}`)"
                >
                  <div class="artist-avatar">
                    <img :src="artist.images?.[0]?.url || fallbackImage" alt="Artist" />
                  </div>
                  <span class="text-xs md:text-[16px]">{{ artist.name }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="right-section self-start md:hidden mt-4">
            <!-- Album Cover -->
            <div class="album-cover">
              <img :src="album?.images?.[0]?.url || fallbackImage" alt="Album Cover" />
            </div>

            <!-- Genre Tags -->
            <div class="genre-tags" v-if="album?.genres?.length">
              <span v-for="genre in album.genres.slice(0, 6)" :key="genre" class="genre">{{
                genre
              }}</span>
            </div>

            <!-- Featured Artists -->

          </div>
        </div>

        <!-- Controls -->
        <div class="controls">
          <button class="play-btn flex items-center justify-center">▶</button>
          <button class="icon-btn text-4xl">♡</button>
          <button class="icon-btn">⟳</button>
          <button class="icon-btn">⋯</button>
        </div>

        <!-- Track List -->
        <div class="track-list">
          <div class="grow" v-if="loadingAlbum">
        <div class="flex flex-col gap-1 md:w-[55vw] w-[100vw]">
          <div v-for="i in 10" :key="i" class="flex items-center p-2 rounded-md mb-4 bg-[hsl(0,0%,8%)]">
            <!-- Album cover -->
            <div class=" h-10 bg-gray-700 rounded mr-4"></div>
            <div class="flex flex-col gap-1">
              <!-- Song title -->
              <div class="h-4 w-40 bg-gray-700 rounded"></div>
              <!-- Small text -->
              <div class="h-3 w-24 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
          <div v-else>
            <div v-for="(track, index) in tracks.slice(0, 10)" :key="track.id" class="track-row relative z-2 bg-[hsl(0,0%,8%)] mb-2">
              <router-link :to="`/track/${track.id}`" class="absolute inset-0"></router-link>
              <span class="track-number text-xs md:text-[16px]">{{ index + 1 }}</span>
              <div class="track-info">
                <p class="track-name text-md md:text-[16px] truncate w-[45vw]">{{ track.name }}</p>
                <p class="track-artists">{{ getArtistNames(track.artists) }}</p>
              </div>
              <div class="track-actions">
                <span
                  class="heart text-[16px] md:text-2xl"
                  :class="{ liked: likedTracks.includes(track.id) }"
                  @click="toggleLike(track.id)"
                >
                  ♥
                </span>
                <span class="track-duration">
                  {{ formatDuration(track.duration_ms) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="right-section hidden md:block">
        <!-- Album Cover -->
        <div class="album-cover">
          <img :src="album?.images?.[0]?.url || fallbackImage" alt="Album Cover" />
        </div>

        <!-- Genre Tags -->
        <div class="genre-tags" v-if="album?.genres?.length">
          <span v-for="genre in album.genres.slice(0, 6)" :key="genre" class="genre">{{
            genre
          }}</span>
        </div>

        <!-- Featured Artists -->
        <div class="featured-artists" v-if="featuredArtists.length">
          <ul>
            <li
              v-for="artist in featuredArtists"
              :key="artist.id"
              class="artist-row hover:underline cursor-pointer"
              @click="router.push(`/artist/${artist.id}`)"
            >
              <div class="artist-avatar">
                <img :src="artist.images?.[0]?.url || fallbackImage" alt="Artist" />
              </div>
              <span>{{ artist.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'AlbumPage' })
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const album = ref(null)
const tracks = ref([])
const loadingAlbum = ref(true)
const likedTracks = ref([])
const featuredArtists = ref([])
const fallbackImage = 'https://via.placeholder.com/300x300?text=No+Image'
const Route = useRoute()
const router = useRouter()

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

const getArtistNames = (artists) => artists?.map((a) => a.name).join(', ') || 'Unknown'

const fetchArtistDetails = async (ids, token) => {
  const res = await fetch(`https://api.spotify.com/v1/artists?ids=${ids.join(',')}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data.artists
}

const CLIENT_ID = '138c665e559f48ecb1bfe23378edfff9'
const CLIENT_SECRET = '193754eb82e0496ab5236eec396c12b5'

const getAccessToken = async () => {
  const url = 'https://accounts.spotify.com/api/token'
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  }
  const res = await fetch(url, options)
  const data = await res.json()
  return data.access_token
}

const fetchAlbumData = async () => {
  loadingAlbum.value = true
  const token = await getAccessToken()
  if (!token) return

  try {
    const res = await fetch(`https://api.spotify.com/v1/albums/${Route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    album.value = await res.json()
    tracks.value = album.value.tracks.items

    // Fetch first 3 artist details
    const artistIds = album.value.artists.slice(0, 3).map((a) => a.id)
    featuredArtists.value = await fetchArtistDetails(artistIds, token)
  } catch (err) {
    console.error('Error fetching album:', err)
  } finally {
    loadingAlbum.value = false
  }
  console.log(album.value)
}

const totalDuration = computed(() => {
  if (!tracks.value.length) return ''
  const totalMs = tracks.value.reduce((sum, t) => sum + t.duration_ms, 0)
  const hours = Math.floor(totalMs / 3600000)
  const minutes = Math.floor((totalMs % 3600000) / 60000)
  return hours ? `${hours} hr ${minutes} min` : `${minutes} min`
})

const toggleLike = (trackId) => {
  if (likedTracks.value.includes(trackId)) {
    likedTracks.value = likedTracks.value.filter((id) => id !== trackId)
  } else {
    likedTracks.value.push(trackId)
  }
}

onMounted(() => {
  fetchAlbumData()
})
</script>

<style scoped>
.spotify-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: #fff;
  font-family: 'Inter', sans-serif;
}

.blur-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(60px) brightness(0.4);
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
}

@media (max-width: 768px) {
  .content {
    padding: 20px;
  }
}

/* Left Section */
.left-section {
  flex: 2;
}

/* Album Header */
.album-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.album-title {
  font-weight: 800;
  margin-bottom: 8px;
}
.album-meta {
  color: #aaa;
  margin-bottom: 20px;
}
.search-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #aaa;
}
.search-btn:hover {
  color: #fff;
}

/* Controls */
.controls {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
}
.play-btn {
  background: #1db954;
  color: black;
  border: none;
  padding: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
}
.icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #aaa;
}
.icon-btn:hover {
  color: #fff;
}

/* Track List */
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
  padding: 10px 5px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
@media screen and (max-width: 768px) {
  .track-row {
    width: 90vw;
    padding: 10px 5px 10px 0px;
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

/* Right Section */
.right-section {
  flex: 1;
}
.album-cover img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
}
.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}
.genre {
  background-color: #282828;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 12px;
  text-transform: uppercase;
}
.featured-artists ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.artist-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 6px 0;
  border-bottom: 1px solid #333;
}
.artist-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .artist-avatar img {
    width: 30px;
    height: 30px;
    border-radius:100%;
  }

}
</style>
