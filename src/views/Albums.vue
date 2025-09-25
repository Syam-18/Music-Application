<script setup>
import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase.js'
import { saveUserProfile } from '@/services/userService'
import { getAlbums, addAlbumToAlbums, removeAlbumFromAlbums } from '@/services/musicService'
import { useRoute } from 'vue-router'
import AlbumCard from '@/components/AlbumCard.vue'
import CardSkeletonLoading from '@/components/CardSkeletonLoading.vue'

const route = useRoute()
const isAlbumsLoading = ref(true)
const loading = ref(true)
const albums = ref([])
const userAlbums = ref([]) // IDs user has saved

// Load both albums + user saved albums
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await saveUserProfile(user)
    await loadAlbums()
  } else {
    albums.value = []
  }
  loading.value = false
})

async function loadAlbums() {
  albums.value = await getAlbums()
  console.log(albums.value)
  await getPopularAlbums()
}

async function toggleAlbum(albumId) {
  if (userAlbums.value.includes(albumId)) {
    await removeAlbumFromAlbums(albumId)
    userAlbums.value = userAlbums.value.filter((id) => id !== albumId)
  } else {
    await addAlbumToAlbums(albumId)
    userAlbums.value.push(albumId)
  }
}

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
  return data.access_token
}

const popularAlbums = ref([])

const getPopularAlbums = async () => {
  const token = await getAccessToken()
  let allPopularAlbums = []

  for (const albumId of albums.value) {
    const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()

    // console.log('API response for', albumId, ':', data)

    if (data && data.id) {
      allPopularAlbums.push(data) // ✅ push album object directly
    } else {
      console.error('No album found for ID:', albumId)
    }
  }

  popularAlbums.value = allPopularAlbums
  console.log('Final popular albums list:', popularAlbums.value)
  isAlbumsLoading.value = false
}
</script>

<template>
  <section class="section p-4 min-h-[150vh]">
    <div class="section-header">
      <h2>Saved Albums</h2>
    </div>
    <div v-if="isAlbumsLoading" class="md:gap-4 flex flex-wrap flex-row w-[100%]">
      <CardSkeletonLoading v-for="n in 6" :key="n" />
    </div>
    <div class="md:gap-4 flex flex-wrap w-[100%]" v-else>
      <AlbumCard v-for="album in popularAlbums" :key="album.id" :album="album" />
    </div>
  </section>
</template>

<style scoped>
.section {
  margin-bottom: 48px;
}

.top-section {
  margin-top: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

@media (max-width: 678px) {
  .section-header {
    margin-bottom: 0px;
  }
}

.section-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

@media (max-width: 678px) {
  .section-header h2 {
    font-size: 16px;
  }
}

.section-nav {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-arrow,
.more-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.nav-arrow:hover:not(:disabled),
.more-btn:hover {
  background: #1a1a1a;
  color: #fff;
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.cards-container {
  overflow: hidden;
}

.cards-grid {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 16px;
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

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .section-nav {
    align-self: flex-end;
  }

  .cards-grid > * {
    flex: 0 0 140px;
  }
}
</style>
