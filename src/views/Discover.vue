<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BrowseView from '@/components/BrowseView.vue'

const router = useRouter()
</script>

<template>
  <div id="container" class="h-auto w-auto overflow-y-scroll bg-[#121212] text-white font-sans">
    <div class="flex items-center justify-between px-6 py-4 bg-[#121212] sticky top-0"></div>

    <main class="px-6 pb-6 mx-auto">
      <BrowseView />
    </main>
  </div>
</template>
