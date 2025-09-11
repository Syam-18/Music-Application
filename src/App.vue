<<<<<<< HEAD
<template>
  <div class="app">
    <div v-if="!isLoginPage" class="main-layout">
      <Sidebar />
      <div class="main-content">
        <TopBar />
        <router-view />
      </div>
    </div>
    <router-view v-else />
    <PlayerBar v-if="!isLoginPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import TopBar from './components/TopBar.vue'
import PlayerBar from './components/PlayerBar.vue'

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
  overflow: hidden;
}

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
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
=======
<script setup></script>

<template>
  <h1 class="text-4xl text-red-400">You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentatiBAGVon
  </p>
</template>

<style scoped></style>
>>>>>>> f04999ac88457181540a72bfe2d07f0caab1b97b
