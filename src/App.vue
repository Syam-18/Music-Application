<template>
  <div class="app">
    <div v-if="!isLoginPage" class="flex h-screen">
      <Sidebar class="w-[100px]" />

      <div class="flex flex-col grow">
        <TopBar class="sticky top-0 z-10" />
        <NavBarMobile class="fixed bottom-0 left-0 right-0 z-10" />

        <div class="grow overflow-auto hide-scrollbar" id="main-scroll">
          <router-view />
          <Footer />
        </div>
      </div>
    </div>
    <router-view v-else />
    <PlayerBar v-if="!isLoginPage" class="fixed left-0 right-0 z-10 player-bar" />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import TopBar from './components/TopBar.vue'
import Footer from './components/Footer.vue'
import NavBarMobile from './components/NavBarMobile.vue'
import PlayerBar from './components/PlayerBar.vue'
import AlbumView from './components/AlbumView.vue'

const route = useRoute()
const router = useRouter()
const isLoginPage = computed(() => route.name === 'Login')
const handleKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    // ignore if user is typing
    const tag = document.activeElement.tagName
    if (['INPUT', 'TEXTAREA'].includes(tag)) return

    e.preventDefault()
    router.push({ name: 'Search' })

    // optional: focus the search input after navigation
    setTimeout(() => {
      const searchInput = document.querySelector('#search-input')
      if (searchInput) searchInput.focus()
    }, 50)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style>
.player-bar {
  bottom: 0px;
}

@media screen and (max-width: 768px) {
  .player-bar {
    bottom: 56px;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Circular', 'Helvetica Neue', Arial, sans-serif;
  background: #000;
  color: #fff;
}

.app {
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
}

.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.main-layout {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
  }
}
</style>
