<script setup></script>
<template>
  <div class="md:hidden">
    <div class="flex items-center p-4">
      <h1 class="text-2xl font-bold text-center">Your Library</h1>
    </div>
    <div class="p-4 flex flex-col gap-4 items-center">
      <div
        class="bg-[hsl(0,0%,10%)] text-white pt-2 pb-2 p-4 rounded hover:bg-[hsl(0,0%,30%)] flex items-center justify-between w-[60vw]"
        @click="$router.push('/liked-songs')"
      >
        <p class="tracking-widest text-lg">Liked Songs</p>
        <div class="playlist-image w-[40px]">
          <div class="heart-icon">❤</div>
        </div>
      </div>
      <div
        class="bg-[hsl(0,0%,10%)] text-white pt-2 pb-2 p-4 rounded hover:bg-[hsl(0,0%,30%)] flex items-center justify-between w-[60vw]"
        @click="$router.push('/liked-songs')"
      >
        <p class="tracking-widest text-lg">Artists</p>
        <div class="playlist-image w-[40px]">
          <div class="heart-icon">❤</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.playlist-image {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1db954, #1ed760);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.heart-icon {
  color: white;
}
</style>
