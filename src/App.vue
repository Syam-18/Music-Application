<template>
  <div class="app">
    <div v-if="!isLoginPage" class="flex h-screen">
      <Sidebar />

      <div class="flex flex-col grow">
        <TopBar class="sticky top-0 z-10" />

        <!-- scrollable area -->
        <div class="grow overflow-auto hide-scrollbar">
          <router-view />
          <Footer />
        </div>
      </div>
    </div>
    <router-view v-else />
    <!-- <PlayerBar v-if="!isLoginPage" class="fixed bottom-0 left-0 right-0"/> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import TopBar from './components/TopBar.vue'
import Footer from './components/Footer.vue'
import PlayerBar from './components/PlayerBar.vue'
import AlbumView from './components/AlbumView.vue'

const route = useRoute()
const isLoginPage = computed(() => route.name === 'Login')
</script>

<style>
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
  height: 100vh;
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
