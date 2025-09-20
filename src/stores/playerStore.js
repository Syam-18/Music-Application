// stores/playerStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  // State
  const currentTrack = ref(null) // Holds the full track object that is currently playing
  const isPlaying = ref(false)   // Boolean to indicate if playback is active

  // Actions (functions that modify state)
  function playTrack(trackData) {
    currentTrack.value = trackData
    isPlaying.value = true
    // In a real app, you'd integrate with an actual audio player here
    console.log('Playing track:', trackData.name)
  }

  function pauseTrack() {
    isPlaying.value = false
    console.log('Track paused')
  }

  function togglePlayPause() {
    isPlaying.value = !isPlaying.value
    console.log('Toggled play/pause, now:', isPlaying.value ? 'playing' : 'paused')
  }

  // You can add more state and actions here, e.g., volume, duration, playlist, etc.

  return {
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    togglePlayPause,
  }
})
