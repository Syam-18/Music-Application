<template>
  <div
    class="album-card w-[100px] md:w-[180px] shrink-0 h-[100%]"
    @click="router.push(`/album/${album.id}`)"
  >
    <div class="card-image">
      <img :src="album.images[0]?.url" :alt="album.name" />
    </div>
    <div class="card-content">
      <h3 class="card-title text-sm md:text-[18px] truncate">{{ album.name }}</h3>
      <div class="flex truncate gap-2">
        <p
          class="card-description text-xs tracking-wider"
          v-for="artist in album.artists"
          @click.stop="router.push(`/artist/${artist.id}`)"
          :key="artist.id"
        >
          {{ artist.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/stores'

const router = useRouter()

const props = defineProps({
  album: {
    type: Object,
    required: true,
  },
})

const showPlayButton = ref(false)

const playAlbum = () => {
  store.playSong(props.album)
}
</script>

<style scoped>
.album-card {
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.album-card:hover {
  background: #1f1f1f;
}

.album-card:hover .play-button {
  opacity: 1;
  transform: translateY(0);
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 16px;
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button {
  position: absolute;
  bottom: 4px;
  right: 4px;
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
  font-weight: 700;
  margin-bottom: 4px;
  line-height: 1.6;
}

.card-type {
  color: #b3b3b3;
  line-height: 1.6;
}
</style>
