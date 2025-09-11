<template>
  <div class="liked-songs-container">
    <div class="liked-songs-header">
      <div class="header-content">
        <div class="playlist-image">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor">
            <path
              d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.726 0l5.916-7.05a4.228 4.228 0 00.946-3.579z" />
          </svg>
        </div>
        <div class="playlist-info">
          <span class="playlist-type">Playlist</span>
          <h1>Liked Songs</h1>
          <div class="playlist-meta">
            <span>{{ store.user?.name || 'User' }}</span>
            <span>•</span>
            <span>{{ likedSongs.length }} songs</span>
          </div>
        </div>
      </div>
    </div>

    <div class="playlist-controls">
      <button class="play-button" @click="playAll">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
        </svg>
      </button>
      <button class="shuffle-button">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M0 3.5A.5.5 0 01.5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 007.556 8a9.624 9.624 0 001.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 017 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 010-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 006.444 8a9.624 9.624 0 00-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 01-.5-.5z" />
        </svg>
      </button>
      <button class="more-button">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 9a1 1 0 100-2 1 1 0 000 2zM8 6a1 1 0 100-2 1 1 0 000 2zM8 12a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      </button>
    </div>

    <div class="songs-table">
      <div class="table-header">
        <div class="col-index">#</div>
        <div class="col-title">Title</div>
        <div class="col-album">Album</div>
        <div class="col-duration">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3.5a.5.5 0 00-1 0V9a.5.5 0 00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71V3.5z" />
            <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm7-8A7 7 0 111 8a7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div class="songs-list">
        <div v-for="(song, index) in likedSongs" :key="song.id" class="song-row" @click="playSong(song)"
          @dblclick="playSong(song)">
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
            <img :src="song.image" :alt="song.title" />
            <div class="song-info">
              <span class="song-title">{{ song.title }}</span>
              <span class="song-artist">{{ song.artist }}</span>
            </div>
          </div>
          <div class="col-album">{{ song.album }}</div>
          <div class="col-duration">
            <button class="like-btn liked" @click.stop="toggleLike(song.id)">
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
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '@/stores'

const likedSongs = computed(() => store.likedSongs)

const playAll = () => {
  if (likedSongs.value.length > 0) {
    store.playSong(likedSongs.value[0])
  }
}

const playSong = (song) => {
  store.playSong(song)
}

const toggleLike = (songId) => {
  store.toggleLike(songId)
}
</script>

<style scoped>
.liked-songs-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #5038a0 0%, #181818 300px);
  overflow: hidden;
}

.liked-songs-header {
  padding: 24px;
  background: linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%);
}

.header-content {
  display: flex;
  align-items: flex-end;
  gap: 24px;
}

.playlist-image {
  width: 232px;
  height: 232px;
  background: linear-gradient(135deg, #450af5, #c4efd9);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4px 60px rgba(0, 0, 0, .5);
}

.playlist-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.playlist-type {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

.playlist-info h1 {
  font-size: 96px;
  font-weight: 900;
  color: #fff;
  line-height: 1;
  margin: 0;
}

.playlist-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 14px;
}

.playlist-controls {
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

.shuffle-button,
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

.shuffle-button:hover,
.more-button:hover {
  color: #fff;
}

.songs-table {
  flex: 1;
  background: #181818;
  overflow-y: auto;
}

.table-header {
  display: grid;
  grid-template-columns: 16px 4fr 2fr 1fr;
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
  grid-template-columns: 16px 4fr 2fr 1fr;
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
  gap: 12px;
}

.col-title img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
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

.col-album {
  display: flex;
  align-items: center;
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

@media (max-width: 768px) {
  .playlist-info h1 {
    font-size: 48px;
  }

  .playlist-image {
    width: 150px;
    height: 150px;
  }

  .table-header,
  .song-row {
    grid-template-columns: 16px 1fr 80px;
  }

  .col-album {
    display: none;
  }
}
</style>
