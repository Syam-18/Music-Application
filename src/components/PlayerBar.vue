<script setup>
import { ref, watch, onUnmounted, onMounted, onBeforeUnmount } from 'vue'
import { usePlayerStore } from '@/stores/playerStore'
import ddlj from '@/assets/ddlj.mp3'

const playerStore = usePlayerStore()
const currentTime = ref(0)
let progressInterval = null
const audio = new Audio(ddlj) // Placeholder audio file
audio.preload = 'auto'

const volume = ref(50)
audio.volume = volume.value / 100

const track = ref(null)

let isDragging = false

function updateVolume(clientX) {
  if (!track.value) return
  const rect = track.value.getBoundingClientRect()
  let offsetX = clientX - rect.left
  let pct = Math.max(0, Math.min(offsetX / rect.width, 1))
  volume.value = Math.round(pct * 100) // reactive
  audio.volume = pct // sets actual audio volume
}

function onMouseMove(e) {
  if (isDragging) updateVolume(e.clientX)
}
function onMouseUp() {
  isDragging = false
}
function onTrackClick(e) {
  updateVolume(e.clientX)
}

window.addEventListener('mousemove', (e) => {
  if (isDragging) {
    updateVolume(e.clientX)
  }
})

window.addEventListener('mouseup', () => {
  isDragging = false
})

// Allow clicking on track

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
})
onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
})

watch(
  () => playerStore.currentTrack,
  (newTrack) => {
    if (newTrack) {
      console.log('Now playing:', newTrack.name)
      // Additional logic to handle track change can be added here
      currentTime.value = 0
      stopProgress()
      if (playerStore.isPlaying) {
        startProgress()
      }
    }
  },
  { immediate: true },
)

watch(
  () => playerStore.isPlaying,
  (playing) => {
    if (playing) {
      startProgress()
    } else {
      stopProgress()
    }
  },
)

const togglePlayBack = () => {
  playerStore.togglePlayPause()
  if (audio.paused) {
    audio.play()
    playerStore.isPlaying = true
  } else {
    audio.pause()
    playerStore.isPlaying = false
  }
}

function msToMinSec(ms) {
  if (typeof ms !== 'number' || isNaN(ms)) return '0:00'
  let totalSeconds = Math.floor(ms / 1000)
  let minutes = Math.floor(totalSeconds / 60)
  let seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function startProgress() {
  stopProgress()
  progressInterval = setInterval(() => {
    if (currentTime.value < playerStore.currentTrack?.duration_ms) {
      currentTime.value += 1000
    } else {
      stopProgress()
    }
  }, 1000)
}

audio.addEventListener('timeupdate', () => {
  currentTime.value = audio.currentTime * 1000 // convert seconds to ms
})

// Update duration in currentTrack when audio metadata loads
audio.addEventListener('loadedmetadata', () => {
  if (playerStore.currentTrack) {
    playerStore.currentTrack.duration_ms = audio.duration * 1000
  }
})

function stopProgress() {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

onUnmounted(() => {
  audio.pause()
  audio.currentTime = 0
  stopProgress()
})
</script>

<template>
  <div class="player-bar">
    <div class="player-left">
      <div class="now-playing">
        <img
          :src="
            playerStore.currentTrack?.album?.images[0]?.url ||
            'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
          "
          alt="Now playing"
        />
        <div class="track-info">
          <span class="track-name truncate w-[auto]">{{
            playerStore.currentTrack?.name || 'Not playing'
          }}</span>
          <span class="artist-name">{{
            playerStore.currentTrack?.artists?.[0]?.name || 'Unknown Artist'
          }}</span>
          <span class="album-name">{{
            playerStore.currentTrack?.album?.name || 'Unknown Album'
          }}</span>
        </div>
      </div>
    </div>

    <div class="player-center">
      <div class="control-buttons">
        <button class="control-btn prev-btn">
          <i class="fa-solid fa-backward"></i>
        </button>
        <button class="control-btn play-btn" @click="togglePlayBack">
          <i class="fa-solid fa-pause" v-if="playerStore.isPlaying"></i>
          <i class="fa-solid fa-play" v-else></i>
        </button>
        <button class="control-btn next-btn">
          <i class="fa-solid fa-forward"></i>
        </button>
      </div>
      <div class="progress-section">
        <span class="time current-time">{{ msToMinSec(currentTime) }}</span>
        <input
          type="range"
          class="text-white"
          min="0"
          :max="playerStore.currentTrack?.duration_ms || 0"
          step="1000"
          v-model="currentTime"
          @input="audio.currentTime = currentTime / 1000"
        />
        <span class="time total-time">{{ msToMinSec(315000) }}</span>
      </div>
    </div>

    <div class="player-right hidden md:flex">
      <div class="volume-controls">
        <button class="control-btn volume-btn">
          <i class="fa-solid fa-volume-high"></i>
        </button>
        <div class="volume-slider">
          <div class="volume-track" ref="track" @click="onTrackClick">
            <div class="volume-fill" :style="{ width: volume + '%' }"></div>
            <div
              class="volume-handle"
              :style="{ left: volume + '%' }"
              @mousedown="isDragging = true"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hide-in-mobile {
  display: hidden;
}
@media screen and (min-width: 768px) {
  .hide-in-mobile {
    display: block;
  }
}
.player-bar {
  height: 100px;
  background: #181818;
  border-top: 1px solid #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

input[type='range'] {
  width: 300px;
  height: 8px;
  background: hsl(0, 0%, 20%); /* track color */
  border-radius: 4px;
  color: white;
  outline: none;
}

.player-left {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 30%;
  min-width: 180px;
}

.now-playing {
  display: flex;
  align-items: center;
  gap: 12px;
}

.now-playing img {
  width: 56px;
  height: 56px;
  border-radius: 4px;
}

.track-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.track-name {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
}

.artist-name {
  color: #b3b3b3;
  font-size: 11px;
  font-weight: 400;
}

.album-name {
  color: #b3b3b3;
  font-size: 11px;
  font-weight: 400;
}

.player-actions {
  align-items: center;
}

.action-btn {
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

.heart {
  cursor: pointer;
  color: #888;
  font-size: 20px;
  transition: color 0.2s;
}
.heart.liked {
  color: red;
}

.action-btn:hover {
  color: #fff;
}

.player-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 40%;
  max-width: 722px;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.control-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: #b3b3b3;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.play-btn {
  width: 32px;
  height: 32px;
  background: #fff;
  color: #000;
}

.play-btn:hover {
  transform: scale(1.06);
}

.progress-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.time {
  color: #b3b3b3;
  font-size: 11px;
  font-weight: 400;
  width: 40px;
  text-align: center;
}

.player-right {
  align-items: center;
  width: 30%;
  min-width: 180px;
  justify-content: flex-end;
}

.volume-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-slider {
  width: 93px;
  height: 12px;
  display: flex;
  align-items: center;
}

.volume-track {
  width: 100%;
  height: 4px;
  background: #4f4f4f;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.volume-fill {
  height: 100%;
  background: #fff;
  border-radius: 2px;
  position: relative;
}

.volume-handle {
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s;
}

.volume-slider:hover .volume-handle {
  opacity: 1;
}

.volume-slider {
  width: 200px;
  height: 10px;
  position: relative;
  cursor: pointer;
}

.volume-track {
  background: #ddd;
  height: 6px;
  border-radius: 3px;
  position: relative;
}

.volume-fill {
  background: #3b82f6; /* Tailwind blue-500 */
  height: 6px;
  border-radius: 3px;
  width: 50%;
}

.volume-handle {
  width: 14px;
  height: 14px;
  background: #3b82f6;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
