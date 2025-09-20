<template>
  <div>
    <section class="section top-section">
      <div class="section-header ">
        <h2 class="">Trending Songs</h2>
      </div>
      <div v-if="isLoading" class="md:gap-4 scroll-container flex flex-row overflow-x-scroll w-[83vw] ">
        <CardSkeletonLoading v-for="n in 8" :key="n" />
      </div>
      <div class="md:gap-4 scroll-container flex flex-row overflow-x-scroll w-[95vw] md:w-[83vw] " v-else>
        <SongCard
          v-for="playlist in trendingTracks"
          :key="playlist.duration_ms"
          :playlist="playlist"
        />
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2>Popular Artists</h2>
      </div>
      <div v-if="isLoading" class="md:gap-4 scroll-container flex flex-row overflow-x-scroll w-[83vw] ">
        <CardSkeletonLoading v-for="n in 8" :key="n" />
      </div>
      <div class="md:gap-4 scroll-container flex flex-row overflow-x-scroll w-[95vw] md:w-[83vw] " v-else>
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
    </section>
    <section class="section">
      <div class="section-header">
        <h2>Popular Albums</h2>
      </div>
      <div v-if="isAlbumsLoading" class="md:gap-4 scroll-container flex flex-row overflow-x-scroll w-[83vw] ">
        <CardSkeletonLoading v-for="n in 8" :key="n" />
      </div>
      <div class="md:gap-4 scroll-container flex flex-row overflow-x-scroll w-[95vw] md:w-[83vw] " v-else>
        <AlbumCard v-for="album in popularAlbums" :key="album.id" :album="album" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import SongCard from './SongCard.vue'
import AlbumCard from './AlbumCard.vue'
import ArtistCard from './ArtistCard.vue'
import CardSkeletonLoading from './CardSkeletonLoading.vue'

const isLoading = ref(true)
const isAlbumsLoading = ref(true)
const trendingTracks = ref([])

// Always fetch a fresh access token
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

const getTrendingTracks = async () => {
  const token = await getAccessToken()
  // Remove any spaces in the playlist ID
  const playlistId = '1iV7itOMvqBlGASzrrAc9R'

  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=20`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  trendingTracks.value = data.items.map((item) => item.track)
  isLoading.value = false
}

const artists = ref([])

const getPopularArtists = async (ids = []) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    console.error('⚠️ Please provide an array of artist IDs')
    return []
  }

  let token = localStorage.getItem('accessToken')
  const expiry = localStorage.getItem('tokenExpiry')

  if (!token || Date.now() > expiry) {
    token = await getAccessToken()
  }

  const res = await fetch(`https://api.spotify.com/v1/artists?ids=${ids.join(',')}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await res.json()
  artists.value = [] // reset list
  data.artists.forEach((artist) => {
    artists.value.push(artist)
  })

  isLoading.value=false
  console.log(artists.value)
  return artists.value
}

// ✅ Call it with IDs
getPopularArtists([
  '0du5cEVh5yTK9QJze8zA0C', // Bruno Mars
  '1Xyo4u8uXC1ZmMpatF05PJ', // The Weeknd
  '1uNFoZAHBGtllmzznpCI3s', // Justin Bieber
  '06HL4z0CvFAxyc27GXpf02', // Taylor Swift
  '3TVXtAsR1Inumwj472S9r4', // Drake
  '66CXWjxzNUsdJxJ2JdwvnR', // Ariana Grande
  '6eUKZXaKkcviH0Ku9w2n3V', // Ed Sheeran
  '6qqNVTkY8uBg9cP3Jd7DAH', // Billie Eilish
  '7dGJo4pcD2V6oG8kP0tJRR', // Eminem
  '5pKCCKE2ajJHZ9KAiaK11H', // Rihanna
])

const popularAlbums = ref([])

const getPopularAlbums = async () => {
  const token = await getAccessToken()
  const albumIds = [
    '1D92WOHWUI2AGQCCdplcXL',
    '69AaAkdktFGnk9POmHENkT',
    '3bosyDPGOYmLnwMNhU06Rx',
    '250nGZusEhq33ZIZYJ7eVb',
    '5bfpRtBW7RNRdsm3tRyl3R',
    '4WLh56ZjwINYBNhaxLvEhA',
    '18CtLoAMTr7F8ngtuM6D8i',
    '25paSmOYSF03s81DCNqQn3',
    '3OxfaVgvTxUTy7276t7SPU',
    '44CdsgXhU5R2esprq0tf43',
    // add more playlist IDs here
  ]

  let allPopularAlbums = []

  for (const albumId of albumIds) {
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
  // console.log('Final popular albums list:', popularAlbums.value)

  popularAlbums.value = allPopularAlbums
  // console.log('Final popular albums list:', popularAlbums.value)
  isAlbumsLoading.value = false
}

onMounted(() => {
  getTrendingTracks()
  getPopularArtists()
  getPopularAlbums()
})

// const scrollSection = (sectionId, direction) => {
//   const element = document.getElementById(sectionId)
//   if (!element) return

//   const scrollAmount = 300
//   const currentScroll = element.scrollLeft
//   const newScroll =
//     direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount

//   element.scrollTo({
//     left: newScroll,
//     behavior: 'smooth',
//   })

//   // Update scroll state after animation
//   setTimeout(() => {
//     updateScrollState(sectionId)
//   }, 300)
// }

// const updateScrollState = (sectionId) => {
//   const element = document.getElementById(sectionId)
//   if (!element) return

//   const { scrollLeft, scrollWidth, clientWidth } = element
//   const maxScroll = scrollWidth - clientWidth

//   switch (sectionId) {
//     case 'made-for-you':
//       canScrollLeft.madeForYou = scrollLeft > 0
//       canScrollRight.madeForYou = scrollLeft < maxScroll - 1
//       break
//     case 'top-mixes':
//       canScrollLeft.topMixes = scrollLeft > 0
//       canScrollRight.topMixes = scrollLeft < maxScroll - 1
//       break
//     case 'favorite-artists':
//       canScrollLeft.favoriteArtists = scrollLeft > 0
//       canScrollRight.favoriteArtists = scrollLeft < maxScroll - 1
//       break
//   }
// }

// onMounted(async () => {
//   await nextTick()
//   updateScrollState('made-for-you')
//   updateScrollState('top-mixes')
//   updateScrollState('favorite-artists')
// })
</script>

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
    margin-bottom:0px;
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
