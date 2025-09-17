<script setup>
import { useRoute,useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const changeSearchPath = () => {
  if (route.name === 'SearchResults') {
    router.push(`/search/${router.params.id}`)
  } else {
    router.push('/search')
  }
}
</script>

<template>
  <div class="bg-black pl-4 pr-4 h-16 flex justify-around items-center md:hidden border-t-[hsl(0,0%,50%)] rounded-2xl border-t-2">
    <button
      :class="{ active: $route.name === 'Home' }"
      @click="$router.push('/')"
    >
      <i class="fa-solid fa-house"></i>
    </button>
    <button
      :class="{ active: $route.name === 'Search' }"
      @click="changeSearchPath"
    >
      <i class="fa-solid fa-search"></i>
    </button>
    <button
    @click="$router.push('/library')">
      <i class="fa-solid fa-bookmark"></i>
    </button>
    <button>
      <i class="fa-solid fa-user"></i>
    </button>
  </div>
</template>
