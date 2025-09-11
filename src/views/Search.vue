<template>
  <div class="search-container">
    <div class="search-header">
      <div class="search-input-container">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M10.68 11.74a6 6 0 01-7.922-8.982 6 6 0 018.982 7.922l3.04 3.04a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L10.68 11.74zm-2.49-8.993a4.5 4.5 0 00-6.37 6.37 4.5 4.5 0 006.37-6.37z" />
        </svg>
        <input v-model="searchQuery" type="text" placeholder="What do you want to play?" @input="handleSearch" />
      </div>
    </div>

    <div class="search-content">
      <div v-if="!searchQuery" class="search-home">
        <section class="recent-searches" v-if="recentSearches.length">
          <h2>Recent searches</h2>
          <div class="recent-items">
            <div v-for="item in recentSearches" :key="item.id" class="recent-item" @click="selectRecentSearch(item)">
              <img :src="item.image" :alt="item.name" />
              <span>{{ item.name }}</span>
              <button class="remove-btn" @click.stop="removeRecentSearch(item.id)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <section class="browse-all">
          <h2>Browse all</h2>
          <div class="browse-grid">
            <div class="browse-category" style="background: linear-gradient(135deg, #8400e7 0%, #44107a 100%)">
              <span>Made For You</span>
            </div>
            <div class="browse-category" style="background: linear-gradient(135deg, #e1118c 0%, #f73570 100%)">
              <span>New Releases</span>
            </div>
            <div class="browse-category" style="background: linear-gradient(135deg, #1e3264 0%, #0d47a1 100%)">
              <span>Spotify Classics</span>
            </div>
            <div class="browse-category" style="background: linear-gradient(135deg, #8d67ab 0%, #9a208c 100%)">
              <span>Charts</span>
            </div>
            <div class="browse-category" style="background: linear-gradient(135deg, #e91429 0%, #dc148c 100%)">
              <span>Trending</span>
            </div>
            <div class="browse-category" style="background: linear-gradient(135deg, #27856a 0%, #1db954 100%)">
              <span>Discover</span>
            </div>
            <div class="browse-category" style="background: linear-gradient(135deg, #777777 0%, #333333 100%)">
              <span>Spotify Singles</span>
            </div>
            <div class="browse-category" style="background: linear-gradient(135deg, #bc5900 0%, #8e44ad 100%)">
              <span>Decades</span>
            </div>
          </div>
        </section>

        <section class="genres">
          <h2>Genres</h2>
          <div class="genres-grid">
            <div class="genre-card" style="background: linear-gradient(135deg, #148a08 0%, #b49bc8 100%)">
              <span>Pop</span>
            </div>
            <div class="genre-card" style="background: linear-gradient(135deg, #ba5d07 0%, #6d1919 100%)">
              <span>Country</span>
            </div>
            <div class="genre-card" style="background: linear-gradient(135deg, #8d67ab 0%, #ba5d07 100%)">
              <span>Hip-Hop</span>
            </div>
            <div class="genre-card" style="background: linear-gradient(135deg, #477d95 0%, #0c73b8 100%)">
              <span>Rock</span>
            </div>
            <div class="genre-card" style="background: linear-gradient(135deg, #e13300 0%, #f59b00 100%)">
              <span>Indie</span>
            </div>
            <div class="genre-card" style="background: linear-gradient(135deg, #8400e7 0%, #44107a 100%)">
              <span>Punk</span>
            </div>
            <div class="genre-card" style="background: linear-gradient(135deg, #e91429 0%, #dc148c 100%)">
              <span>Metal</span>
            </div>
            <div class="genre-card" style="background: linear-gradient(135deg, #477d95 0%, #0c73b8 100%)">
              <span>Instrumental</span>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="search-results">
        <div v-if="searchResults.length === 0" class="no-results">
          <p>No results found for "{{ searchQuery }}"</p>
        </div>
        <div v-else>
          <section v-if="searchResults.songs?.length" class="results-section">
            <h3>Songs</h3>
            <div class="songs-list">
              <div v-for="song in searchResults.songs" :key="song.id" class="song-item" @click="playSong(song)">
                <img :src="song.image" :alt="song.title" />
                <div class="song-info">
                  <span class="song-title">{{ song.title }}</span>
                  <span class="song-artist">{{ song.artist }}</span>
                </div>
                <span class="song-duration">{{ song.duration }}</span>
              </div>
            </div>
          </section>

          <section v-if="searchResults.artists?.length" class="results-section">
            <h3>Artists</h3>
            <div class="artists-grid">
              <div v-for="artist in searchResults.artists" :key="artist.id" class="artist-item"
                @click="goToArtist(artist.id)">
                <img :src="artist.image" :alt="artist.name" />
                <span>{{ artist.name }}</span>
                <small>Artist</small>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/stores'

const router = useRouter()
const searchQuery = ref('')
const searchResults = ref({})

const recentSearches = computed(() => store.recentSearches)

const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = {}
    return
  }

  // Mock search results
  searchResults.value = {
    songs: [
      {
        id: 1,
        title: 'Get Lucky',
        artist: 'Daft Punk',
        duration: '4:35',
        image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      {
        id: 2,
        title: 'Instant Crush',
        artist: 'Daft Punk',
        duration: '5:37',
        image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      }
    ],
    artists: [
      {
        id: 1,
        name: 'Daft Punk',
        image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      }
    ]
  }
}

const selectRecentSearch = (item) => {
  searchQuery.value = item.name
  handleSearch()
}

const removeRecentSearch = (id) => {
  const index = store.recentSearches.findIndex(item => item.id === id)
  if (index > -1) {
    store.recentSearches.splice(index, 1)
  }
}

const playSong = (song) => {
  store.playSong(song)
}

const goToArtist = (artistId) => {
  router.push(`/artist/${artistId}`)
}
</script>

<style scoped>
.search-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #000;
  overflow: hidden;
}

.search-header {
  padding: 16px 24px;
  border-bottom: 1px solid #1a1a1a;
}

.search-input-container {
  position: relative;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #b3b3b3;
}

.search-input-container input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border-radius: 50px;
  border: none;
  background: #2a2a2a;
  color: #fff;
  font-size: 14px;
}

.search-input-container input:focus {
  outline: none;
  background: #333;
}

.search-input-container input::placeholder {
  color: #b3b3b3;
}

.search-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.recent-searches h2,
.browse-all h2,
.genres h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
}

.recent-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.recent-item:hover {
  background: #1a1a1a;
}

.recent-item img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.recent-item span {
  flex: 1;
  color: #fff;
  font-weight: 500;
}

.remove-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: #b3b3b3;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #333;
  color: #fff;
}

.browse-grid,
.genres-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.browse-category,
.genre-card {
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;
  overflow: hidden;
}

.browse-category:hover,
.genre-card:hover {
  transform: scale(1.02);
}

.browse-category span,
.genre-card span {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.results-section {
  margin-bottom: 32px;
}

.results-section h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
}

.songs-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.song-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.song-item:hover {
  background: #1a1a1a;
}

.song-item img {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
}

.song-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.song-title {
  color: #fff;
  font-weight: 500;
}

.song-artist {
  color: #b3b3b3;
  font-size: 14px;
}

.song-duration {
  color: #b3b3b3;
  font-size: 14px;
}

.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.artist-item {
  background: #181818;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.artist-item:hover {
  background: #282828;
  transform: translateY(-4px);
}

.artist-item img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}

.artist-item span {
  display: block;
  color: #fff;
  font-weight: 700;
  margin-bottom: 4px;
}

.artist-item small {
  color: #b3b3b3;
}

.no-results {
  text-align: center;
  padding: 48px;
  color: #b3b3b3;
}

@media (max-width: 768px) {
  .search-content {
    padding: 16px;
  }

  .browse-grid,
  .genres-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }

  .browse-category span,
  .genre-card span {
    font-size: 18px;
  }
}
</style>
