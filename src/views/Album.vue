<template>
  <div class="album-container">
    <div class="album-header">
      <div class="header-content">
        <div class="album-image">
          <img :src="album.image" :alt="album.title" />
        </div>
        <div class="album-info">
          <span class="album-type">Album</span>
          <h1>{{ album.title }}</h1>
          <div class="album-meta">
            <router-link :to="`/artist/${album.artistId}`" class="artist-link">
              <img :src="album.artistImage" :alt="album.artist" />
              <span>{{ album.artist }}</span>
            </router-link>
            <span>•</span>
            <span>{{ album.year }}</span>
            <span>•</span>
            <span>{{ album.songs.length }} songs</span>
            <span>•</span>
            <span>{{ album.duration }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="album-controls">
      <button class="play-button" @click="playAll">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
        </svg>
      </button>
      <button class="like-button" :class="{ liked: album.liked }" @click="toggleAlbumLike">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
          <path
            d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.726 0l5.916-7.05a4.228 4.228 0 00.946-3.579z" />
        </svg>
      </button>
      <button class="more-button">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
          <path d="M8 9a1 1 0 100-2 1 1 0 000 2zM8 6a1 1 0 100-2 1 1 0 000 2zM8 12a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      </button>
    </div>

    <div class="songs-table">
      <div class="table-header">
        <div class="col-index">#</div>
        <div class="col-title">Title</div>
        <div class="col-duration">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3.5a.5.5 0 00-1 0V9a.5.5 0 00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71V3.5z" />
            <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm7-8A7 7 0 111 8a7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div class="songs-list">
        <div v-for="(song, index) in album.songs" :key="song.id" class="song-row" @click="playSong(song)">
          <div class="col-index">
            <span class="track-number">{{ index + 1 }}</span>
            <button class="play-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path
                  d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              </svg>
            </button>
          </div>
          <div class="col-title">
            <div class="song-info">
              <span class="song-title">{{ song.title }}</span>
              <span class="song-artist">{{ song.artist }}</span>
            </div>
          </div>
          <div class="col-duration">
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
    </div>

    <div class="related-artists" v-if="relatedArtists.length">
      <h2>Fans also like</h2>
      <div class="artists-grid">
        <div v-for="artist in relatedArtists" :key="artist.id" class="artist-card" @click="goToArtist(artist.id)">
          <img :src="artist.image" :alt="artist.name" />
          <span>{{ artist.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/stores'

const route = useRoute()
const router = useRouter()

const album = ref({
  id: 1,
  title: 'Random Access Memories',
  artist: 'Daft Punk',
  artistId: 1,
  artistImage: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2',
  year: 2013,
  duration: '1 hr 14 min',
  image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  liked: false,
  songs: [
    {
      id: 1,
      title: 'Give Life Back to Music',
      artist: 'Daft Punk',
      duration: '4:35',
      liked: false
    },
    {
      id: 2,
      title: 'The Game of Love',
      artist: 'Daft Punk',
      duration: '5:22',
      liked: false
    },
    {
      id: 3,
      title: 'Giorgio by Moroder',
      artist: 'Daft Punk',
      duration: '9:04',
      liked: false
    },
    {
      id: 4,
      title: 'Within',
      artist: 'Daft Punk',
      duration: '3:48',
      liked: false
    },
    {
      id: 5,
      title: 'Instant Crush (feat. Julian Casablancas)',
      artist: 'Daft Punk, Julian Casablancas',
      duration: '5:37',
      liked: true
    },
    {
      id: 6,
      title: 'Lose Yourself to Dance (feat. Pharrell Williams)',
      artist: 'Daft Punk, Pharrell Williams',
      duration: '5:53',
      liked: false
    },
    {
      id: 7,
      title: 'Touch (feat. Pharrell Williams)',
      artist: 'Daft Punk, Pharrell Williams',
      duration: '8:18',
      liked: false
    },
    {
      id: 8,
      title: 'Get Lucky (feat. Pharrell Williams and Nile Rodgers)',
      artist: 'Daft Punk, Pharrell Williams, Nile Rodgers',
      duration: '6:09',
      liked: true
    },
    {
      id: 9,
      title: 'Beyond',
      artist: 'Daft Punk',
      duration: '4:50',
      liked: false
    }
  ]
})

const relatedArtists = ref([
  {
    id: 2,
    name: 'Pharrell Williams',
    image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: 3,
    name: 'Nile Rodgers',
    image: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  }
])

const playAll = () => {
  if (album.value.songs.length > 0) {
    store.playSong(album.value.songs[0])
  }
}

const playSong = (song) => {
  store.playSong(song)
}

const toggleAlbumLike = () => {
  album.value.liked = !album.value.liked
}

const toggleSongLike = (songId) => {
  const song = album.value.songs.find(s => s.id === songId)
  if (song) {
    song.liked = !song.liked
  }
}

const goToArtist = (artistId) => {
  router.push(`/artist/${artistId}`)
}

onMounted(() => {
  // Load album data based on route.params.id
  console.log('Loading album:', route.params.id)
})
</script>

<style scoped>
.album-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #5038a0 0%, #181818 300px);
  overflow: hidden;
}

.album-header {
  padding: 24px;
  background: linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%);
}

.header-content {
  display: flex;
  align-items: flex-end;
  gap: 24px;
}

.album-image {
  width: 232px;
  height: 232px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 60px rgba(0, 0, 0, .5);
}

.album-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.album-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.album-type {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

.album-info h1 {
  font-size: 96px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
  margin: 0;
}

.album-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 14px;
}

.artist-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  text-decoration: none;
  transition: text-decoration 0.2s;
}

.artist-link:hover {
  text-decoration: underline;
}

.artist-link img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.album-controls {
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

.like-button,
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

.like-button:hover,
.more-button:hover {
  color: #fff;
}

.like-button.liked {
  color: #1db954;
}

.songs-table {
  flex: 1;
  background: #181818;
  overflow-y: auto;
}

.table-header {
  display: grid;
  grid-template-columns: 16px 1fr 1fr;
  gap: 16px;
  padding: 8px 16px;
  border-bottom: 1px solid #282828;
  color: #b3b3b3;
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: sticky;
  top: 0;
  background: #181818;
  z-index: 1;
}

.songs-list {
  padding: 0 16px;
}

.song-row {
  display: grid;
  grid-template-columns: 16px 1fr 1fr;
  gap: 16px;
  padding: 8px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.song-row:hover {
  background: rgba(255, 255, 255, .1);
}

.song-row:hover .track-number {
  display: none;
}

.song-row:hover .play-btn {
  display: flex;
}

.col-index {
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

.col-title {
  display: flex;
  align-items: center;
}

.song-info {
  display: flex;
  flex-direction: column;
}

.song-title {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
}

.song-artist {
  color: #b3b3b3;
  font-size: 14px;
}

.col-duration {
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

.song-row:hover .like-btn {
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

.song-row:hover .more-btn {
  opacity: 1;
}

.more-btn:hover {
  color: #fff;
}

.related-artists {
  background: #181818;
  padding: 24px;
}

.related-artists h2 {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
}

.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.artist-card {
  background: #282828;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.artist-card:hover {
  background: #3e3e3e;
  transform: translateY(-4px);
}

.artist-card img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}

.artist-card span {
  display: block;
  color: #fff;
  font-weight: 700;
}

@media (max-width: 768px) {
  .album-info h1 {
    font-size: 48px;
  }

  .album-image {
    width: 150px;
    height: 150px;
  }

  .table-header,
  .song-row {
    grid-template-columns: 16px 1fr 80px;
  }
}
</style>
