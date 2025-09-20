<script setup>
import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase.js'
import { saveUserProfile } from '@/services/userService'
import { getArtists, addArtistToArtists, removeArtistFromArtists } from '@/services/musicService'
import { useRoute } from 'vue-router'
import ArtistCard from '@/components/ArtistCard.vue'
import CardSkeletonLoading from '@/components/CardSkeletonLoading.vue'

const route = useRoute()
const isArtistsLoading = ref(true)
const loading = ref(true)
const artists = ref([])
const userArtists = ref([]) // IDs user has saved

// Load both artists + user saved artists
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await saveUserProfile(user)
    await loadArtists()
  } else {
    artists.value = []
  }
  loading.value = false
})

async function loadArtists() {
  artists.value = await getArtists()
  console.log(artists.value)
  await getPopularArtists()
}

async function toggleArtist(artistId) {
  if (userArtists.value.includes(artistId)) {
    await removeArtistFromArtists(artistId)
    userArtists.value = userArtists.value.filter((id) => id !== artistId)
  } else {
    await addArtistToArtists(artistId)
    userArtists.value.push(artistId)
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

const popularArtists = ref([])

const getPopularArtists = async () => {
  const token = await getAccessToken()
  let allPopularArtists = []

  for (const artistId of artists.value) {
    const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()

    // console.log('API response for', artistId, ':', data)

    if (data && data.id) {
      allPopularArtists.push(data) // ✅ push artist object directly
    } else {
      console.error('No artist found for ID:', artistId)
    }
  }

  popularArtists.value = allPopularArtists
  console.log('Final popular artists list:', popularArtists.value)
  isArtistsLoading.value = false
}
</script>

<template>
  <section class="section p-4">
    <div class="section-header">
      <h2>Favourite Artists</h2>
    </div>
    <div v-if="isArtistsLoading" class="md:gap-4 flex flex-wrap flex-row w-[100%]">
      <CardSkeletonLoading v-for="n in 6" :key="n" />
    </div>
    <div class="md:gap-4 flex flex-wrap w-[100%]" v-else>
      <ArtistCard
        v-for="artist in popularArtists"
        :key="artist.id"
        :artist="{
            id: artist.id,
            name: artist.name,
            image: artist.images[0]?.url, // ✅ use Spotify image
          }"
      />
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
