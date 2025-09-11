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
