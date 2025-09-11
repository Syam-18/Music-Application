<template>
  <div class="library-container">
    <div class="library-header">
      <div class="library-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M3 22a1 1 0 01-1-1V3a1 1 0 011-1h3v20H3zM7 2a1 1 0 011-1h12a1 1 0 011 1v20a1 1 0 01-1 1H8a1 1 0 01-1-1V2zm2 2v16h10V4H9z" />
        </svg>
        <span>Your Library</span>
      </div>
      <div class="library-controls">
        <button class="control-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
            <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
          </svg>
        </button>
        <button class="control-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" />
          </svg>
        </button>
      </div>
    </div>

    <div class="library-filters">
      <div class="filter-tabs">
        <button v-for="filter in filters" :key="filter" :class="['filter-tab', { active: activeFilter === filter }]"
          @click="activeFilter = filter">
          {{ filter }}
        </button>
      </div>
      <div class="sort-controls">
        <button class="sort-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M10.68 11.74a6 6 0 01-7.922-8.982 6 6 0 018.982 7.922l3.04 3.04a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L10.68 11.74zm-2.49-8.993a4.5 4.5 0 00-6.37 6.37 4.5 4.5 0 006.37-6.37z" />
          </svg>
        </button>
        <button class="sort-btn">
          Recently Added
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M1 3.5a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5zM1 7.5a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5zM1 11.5a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5z" />
          </svg>
        </button>
        <button class="view-toggle">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" />
          </svg>
        </button>
      </div>
    </div>

    <div class="library-content">
      <div v-if="activeFilter === 'All'" class="library-sections">
        <section class="library-section">
          <h3>Playlists</h3>
          <div class="items-list">
            <div v-for="playlist in playlists" :key="playlist.id" class="library-item"
              @click="goToPlaylist(playlist.id)">
              <img :src="playlist.image" :alt="playlist.name" />
              <div class="item-info">
                <span class="item-name">{{ playlist.name }}</span>
                <span class="item-details">Playlist • {{ playlist.owner }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="library-section">
          <h3>Albums</h3>
          <div class="items-list">
            <div v-for="album in albums" :key="album.id" class="library-item" @click="goToAlbum(album.id)">
              <img :src="album.image" :alt="album.title" />
              <div class="item-info">
                <span class="item-name">{{ album.title }}</span>
                <span class="item-details">Album • {{ album.artist }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="library-section">
          <h3>Artists</h3>
          <div class="items-list">
            <div v-for="artist in artists" :key="artist.id" class="library-item" @click="goToArtist(artist.id)">
              <img :src="artist.image" :alt="artist.name" />
              <div class="item-info">
                <span class="item-name">{{ artist.name }}</span>
                <span class="item-details">Artist</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="filtered-content">
        <div class="items-list">
          <div v-for="item in filteredItems" :key="item.id" class="library-item" @click="goToItem(item)">
            <img :src="item.image" :alt="item.name || item.title" />
            <div class="item-info">
              <span class="item-name">{{ item.name || item.title }}</span>
              <span class="item-details">{{ item.type }} • {{ item.details }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeFilter = ref('All')
const filters = ['All', 'Playlists', 'Artists', 'Albums', 'Podcasts', 'Audiobooks']

const playlists = ref([
  {
    id: 1,
    name: 'Liked Songs',
    owner: 'You',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    type: 'Playlist',
    details: 'You'
  },
  {
    id: 2,
    name: 'My Playlist #1',
    owner: 'You',
    image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    type: 'Playlist',
    details: 'You'
  }
])

const albums = ref([
  {
    id: 1,
    title: 'Random Access Memories',
    artist: 'Daft Punk',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    type: 'Album',
    details: 'Daft Punk'
  },
  {
    id: 2,
    title: 'Discovery',
    artist: 'Daft Punk',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    type: 'Album',
    details: 'Daft Punk'
  }
])

const artists = ref([
  {
    id: 1,
    name: 'Daft Punk',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    type: 'Artist',
    details: 'Artist'
  },
  {
    id: 2,
    name: 'The Beatles',
    image: 'https://images.pexels.com/photos/1699159/pexels-photo-1699159.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    type: 'Artist',
    details: 'Artist'
  }
])

const filteredItems = computed(() => {
  switch (activeFilter.value) {
    case 'Playlists':
      return playlists.value
    case 'Albums':
      return albums.value
    case 'Artists':
      return artists.value
    case 'Podcasts':
      return []
    case 'Audiobooks':
      return []
    default:
      return [...playlists.value, ...albums.value, ...artists.value]
  }
})

const goToPlaylist = (id) => {
  if (id === 1) {
    router.push('/liked-songs')
  } else {
    router.push(`/playlist/${id}`)
  }
}

const goToAlbum = (id) => {
  router.push(`/album/${id}`)
}

const goToArtist = (id) => {
  router.push(`/artist/${id}`)
}

const goToItem = (item) => {
  switch (item.type) {
    case 'Playlist':
      goToPlaylist(item.id)
      break
    case 'Album':
      goToAlbum(item.id)
      break
    case 'Artist':
      goToArtist(item.id)
      break
  }
}
</script>

<style scoped>
.library-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #000;
  overflow: hidden;
}

.library-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #1a1a1a;
}

.library-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #b3b3b3;
  font-size: 16px;
  font-weight: 700;
}

.library-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
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

.control-btn:hover {
  background: #1a1a1a;
  color: #fff;
}

.library-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #1a1a1a;
}

.filter-tabs {
  display: flex;
  gap: 8px;
}

.filter-tab {
  padding: 6px 12px;
  border: none;
  border-radius: 50px;
  background: #2a2a2a;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.2s;
}

.filter-tab.active {
  background: #fff;
  color: #000;
}

.filter-tab:hover:not(.active) {
  background: #3e3e3e;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-btn,
.view-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.sort-btn:hover,
.view-toggle:hover {
  background: #1a1a1a;
  color: #fff;
}

.library-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
}

.library-sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.library-section h3 {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.library-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.library-item:hover {
  background: #1a1a1a;
}

.library-item img {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
}

.item-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.item-name {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
}

.item-details {
  color: #b3b3b3;
  font-size: 14px;
}

.library-content::-webkit-scrollbar {
  width: 12px;
}

.library-content::-webkit-scrollbar-track {
  background: #000;
}

.library-content::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 6px;
}

.library-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-width: 768px) {

  .library-header,
  .library-filters {
    padding: 12px 16px;
  }

  .library-content {
    padding: 16px;
  }

  .filter-tabs {
    flex-wrap: wrap;
  }

  .sort-controls {
    display: none;
  }
}
</style>
