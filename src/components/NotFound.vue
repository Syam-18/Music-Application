<script setup>
import { useRoute } from 'vue-router';

  const router = useRoute()
</script>
<template>
  <div class="h-screen flex flex-col items-center text-white" style="margin-top:30vh;">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-xl mb-8">We didn't create that page yet!</p>
    <button
      @click="$router.push('/')"
      class="bg-[hsl(0,0%,10%)] hover:bg-[hsl(0,0%,30%)] text-white font-bold pl-4 pr-4 p-2 mt-2 rounded"
    >
      Go to Home
    </button>

  </div>
</template>
