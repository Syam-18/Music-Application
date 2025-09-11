<template>
  <div class="artist-container">
    <div class="artist-header">
      <div class="header-content">
        <div class="artist-image">
          <img :src="artist.image" :alt="artist.name" />
        </div>
        <div class="artist-info">
          <span class="verified-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Verified Artist
          </span>
          <h1>{{ artist.name }}</h1>
          <div class="artist-meta">
            <span>{{ artist.monthlyListeners }} monthly listeners</span>
          </div>
        </div>
      </div>
    </div>

    <div class="artist-controls">
      <button class="play-button" @click="playAll">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
        </svg>
      </button>
      <button class="follow-button" :class="{ following: artist.following }" @click="toggleFollow">
        {{ artist.following ? 'Following' : 'Follow' }}
      </button>
      <button class="more-button">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
          <path d="M8 9a1 1 0 100-2 1 1 0 000 2zM8 6a1 1 0 100-2 1 1 0 000 2zM8 12a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      </button>
    </div>

    <div class="artist-content">
      <section class="popular-tracks">
        <h2>Popular</h2>
        <div class="tracks-list">
          <div v-for="(song, index) in artist.popularTracks.slice(0, 5)" :key="song.id" class="track-row"
            @click="playSong(song)">
            <div class="track-index">
              <span class="track-number">{{ index + 1 }}</span>
              <button class="play-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
              </button>
            </div>
            <div class="track-info">
              <img :src="song.image" :alt="song.title" />
              <div class="song-details">
                <span class="song-title">{{ song.title }}</span>
                <span class="play-count">{{ song.playCount }}</span>
              </div>
            </div>
            <div class="track-actions">
              <button class="like-btn" :class="{ liked: song.liked }" @click.stop="toggleSongLike(song.id)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path
                    d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.726 0l5.916-7.05a4.228 4.228 0 00.946-3.579z" />
                </svg>
              </button>
              <span class="duration">{{ song.duration }}</span>
              <button class="more-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 9a1 1 0 100-2 1 1 0 000 2zM8 6a1 1 0 100-2 1 1 0 000 2zM8 12a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <button class="show-all-btn" @click="showAllTracks = !showAllTracks">
          {{ showAllTracks ? 'Show less' : 'Show all' }}
        </button>
      </section>

      <section class="discography">
        <div class="section-header">
          <h2>Discography</h2>
          <button class="show-all-link">Show all</button>
        </div>
        <div class="albums-grid">
          <div v-for="album in artist.albums" :key="album.id" class="album-card" @click="goToAlbum(album.id)">
            <img :src="album.image" :alt="album.title" />
            <div class="album-info">
              <span class="album-title">{{ album.title }}</span>
              <span class="album-year">{{ album.year }} • {{ album.type }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="similar-artists">
        <div class="section-header">
          <h2>Fans also like</h2>
          <button class="show-all-link">Show all</button>
        </div>
        <div class="artists-grid">
          <div v-for="similarArtist in artist.similarArtists" :key="similarArtist.id" class="artist-card"
            @click="goToArtist(similarArtist.id)">
            <img :src="similarArtist.image" :alt="similarArtist.name" />
            <span>{{ similarArtist.name }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/stores'

const route = useRoute()
const router = useRouter()
const showAllTracks = ref(false)

const artist = ref({
  id: 1,
  name: 'Daft Punk',
  image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  monthlyListeners: '47,123,456',
  following: false,
  popularTracks: [
    {
      id: 1,
      title: 'Get Lucky (feat. Pharrell Williams and Nile Rodgers)',
      playCount: '1,234,567,890',
      duration: '6:09',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: true
    },
    {
      id: 2,
      title: 'One More Time',
      playCount: '987,654,321',
      duration: '5:20',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: false
    },
    {
      id: 3,
      title: 'Harder Better Faster Stronger',
      playCount: '876,543,210',
      duration: '3:45',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: false
    },
    {
      id: 4,
      title: 'Around the World',
      playCount: '765,432,109',
      duration: '7:09',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: false
    },
    {
      id: 5,
      title: 'Instant Crush (feat. Julian Casablancas)',
      playCount: '654,321,098',
      duration: '5:37',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      liked: true
    }
  ],
  albums: [
    {
      id: 1,
      title: 'Random Access Memories',
      year: 2013,
      type: 'Album',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 2,
      title: 'Discovery',
      year: 2001,
      type: 'Album',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 3,
      title: 'Homework',
      year: 1997,
      type: 'Album',
      image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ],
  similarArtists: [
    {
      id: 2,
      name: 'Justice',
      image: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 3,
      name: 'Moderat',
      image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 4,
      name: 'Deadmau5',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ]
})

const playAll = () => {
  if (artist.value.popularTracks.length > 0) {
    store.playSong(artist.value.popularTracks[0])
  }
}

const playSong = (song) => {
  store.playSong(song)
}

const toggleFollow = () => {
  artist.value.following = !artist.value.following
}

const toggleSongLike = (songId) => {
  const song = artist.value.popularTracks.find(s => s.id === songId)
  if (song) {
    song.liked = !song.liked
  }
}

const goToAlbum = (albumId) => {
  router.push(`/album/${albumId}`)
}

const goToArtist = (artistId) => {
  router.push(`/artist/${artistId}`)
}

onMounted(() => {
  // Load artist data based on route.params.id
  console.log('Loading artist:', route.params.id)
})
</script>

<style scoped>
.artist-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #5038a0 0%, #181818 300px);
  overflow: hidden;
}

.artist-header {
  padding: 24px;
  background: linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%);
}

.header-content {
  display: flex;
  align-items: flex-end;
  gap: 24px;
}

.artist-image {
  width: 232px;
  height: 232px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 60px rgba(0, 0, 0, .5);
}

.artist-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.artist-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.verified-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 400;
  color: #4d9de0;
}

.artist-info h1 {
  font-size: 96px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
  margin: 0;
}

.artist-meta {
  color: #fff;
  font-size: 16px;
}

.artist-controls {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 24px;
  background: linear-gradient(rgba(0, 0, 0, .6) 0, #181818 100%);
}

.play-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #1db954;
  border: none;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
}

.play-button:hover {
  transform: scale(1.04);
}

.follow-button {
  padding: 8px 32px;
  border: 1px solid #727272;
  border-radius: 4px;
  background: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s;
}

.follow-button:hover {
  border-color: #fff;
  transform: scale(1.04);
}

.follow-button.following {
  background: #1db954;
  border-color: #1db954;
  color: #000;
}

.more-button {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.more-button:hover {
  color: #fff;
}

.artist-content {
  flex: 1;
  background: #181818;
  overflow-y: auto;
  padding: 24px;
}

.popular-tracks,
.discography,
.similar-artists {
  margin-bottom: 48px;
}

.popular-tracks h2,
.discography h2,
.similar-artists h2 {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.show-all-link {
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.2s;
}

.show-all-link:hover {
  color: #fff;
}

.tracks-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.track-row {
  display: grid;
  grid-template-columns: 16px 1fr auto;
  gap: 16px;
  padding: 8px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.track-row:hover {
  background: rgba(255, 255, 255, .1);
}

.track-row:hover .track-number {
  display: none;
}

.track-row:hover .play-btn {
  display: flex;
}

.track-index {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.track-number {
  color: #b3b3b3;
  font-size: 16px;
}

.play-btn {
  display: none;
  width: 16px;
  height: 16px;
  border: none;
  background: none;
  color: #fff;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.track-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.track-info img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.song-details {
  display: flex;
  flex-direction: column;
}

.song-title {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
}

.play-count {
  color: #b3b3b3;
  font-size: 14px;
}

.track-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.like-btn {
  width: 16px;
  height: 16px;
  border: none;
  background: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s;
}

.track-row:hover .like-btn {
  opacity: 1;
}

.like-btn.liked {
  color: #1db954;
  opacity: 1;
}

.duration {
  color: #b3b3b3;
  font-size: 14px;
  min-width: 40px;
  text-align: right;
}

.more-btn {
  width: 16px;
  height: 16px;
  border: none;
  background: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s;
}

.track-row:hover .more-btn {
  opacity: 1;
}

.more-btn:hover {
  color: #fff;
}

.show-all-btn {
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.2s;
}

.show-all-btn:hover {
  color: #fff;
}

.albums-grid,
.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.album-card,
.artist-card {
  background: #282828;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.album-card:hover,
.artist-card:hover {
  background: #3e3e3e;
  transform: translateY(-4px);
}

.album-card img,
.artist-card img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  object-fit: cover;
  margin-bottom: 12px;
}

.artist-card img {
  border-radius: 50%;
}

.album-info {
  display: flex;
  flex-direction: column;
}

.album-title {
  color: #fff;
  font-weight: 700;
  margin-bottom: 4px;
}

.album-year {
  color: #b3b3b3;
  font-size: 14px;
}

.artist-card span {
  display: block;
  color: #fff;
  font-weight: 700;
  text-align: center;
}

@media (max-width: 768px) {
  .artist-info h1 {
    font-size: 48px;
  }

  .artist-image {
    width: 150px;
    height: 150px;
  }

  .track-row {
    grid-template-columns: 16px 1fr 80px;
  }

  .albums-grid,
  .artists-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}
</style>
