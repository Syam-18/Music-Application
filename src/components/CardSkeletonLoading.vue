<template>

  <div class="playlist-card w-[100px] md:w-[180px] shrink-0">
    <div class="card-image bg-[hsl(0,0%,20%)] animate-pulse">
      <!-- <img :src="album.images[0].url" :alt="playlist.name" /> -->
    </div>
    <div class="card-content">
      <!-- <h3 class="card-title text-md tracking-wider">{{ playlist.name }}</h3>
      <p class="card-description tracking-wider">{{ playlist.artists[0].name }}</p> -->

    </div>
    <div class="card-content">
      <div class="h-6 bg-[hsl(0,0%,20%)] rounded w-3/4 mb-2 animate-pulse"></div>
      <div class="h-4 bg-[hsl(0,0%,20%)] rounded w-1/2 animate-pulse"></div>
    </div>
  </div>
</template>



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
