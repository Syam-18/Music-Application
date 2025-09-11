<template>
  <div class="artist-card" @click="playArtist">
    <div class="card-image">
      <img :src="artist.image" :alt="artist.name" />
      <div class="play-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
        </svg>
      </div>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ artist.name }}</h3>
      <p class="card-type">Artist</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  artist: {
    type: Object,
    required: true
  }
})

const playArtist = () => {
  router.push(`/artist/${props.artist.id}`)
}
</script>

<style scoped>
.artist-card {
  background: #181818;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.artist-card:hover {
  background: #282828;
  transform: translateY(-4px);
}

.artist-card:hover .play-button {
  opacity: 1;
  transform: translateY(0);
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 16px;
  border-radius: 50%;
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
  text-align: center;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 1.6;
}

.card-type {
  font-size: 14px;
  color: #b3b3b3;
  line-height: 1.6;
}
</style>
