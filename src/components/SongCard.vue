<template>
  <div class="playlist-card w-[180px] shrink-0" @click="router.push(`/track/${playlist.id}`)">
    <div class="card-image">
      <img :src="album.images[0].url" :alt="playlist.name" />
      <div class="play-button" :class="{ show: showPlayButton }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
        </svg>
      </div>
    </div>
    <div class="card-content">
      <h3 class="card-title text-md tracking-wider hover:underline">{{ playlist.name }}</h3>
      <p class="card-description tracking-wider hover:underline" @click.stop="router.push(`/artist/${playlist.artists[0].id}`)">{{ playlist.artists[0].name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/stores'

const router = useRouter()

const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
})

// console.log(props.playlist)
const { album } = props.playlist

const showPlayButton = ref(false)


const playPlaylist = () => {
  // Navigate to playlist/album page or play directly
  if (props.playlist.id <= 8) {
    router.push(`/playlist/${props.playlist.id}`)
  } else {
    store.playSong(props.playlist)
  }
}
</script>

<style scoped>
.playlist-card {
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.playlist-card:hover {
  background: #1f1f1f;
}

.playlist-card:hover .play-button {
  opacity: 1;
  transform: translateY(0);
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 8px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #1db954;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s ease;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
}

.play-button:hover {
  transform: scale(1.05) translateY(0);
}

.card-content {
  color: #fff;
}

.card-title {
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-description {
  font-size: 14px;
  color: #b3b3b3;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
