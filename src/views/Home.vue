<template>
  <div class="home-container">
    <div class="content-header">
      <div class="content-tabs">
        <button v-for="tab in tabs" :key="tab" :class="['tab', { active: activeTab === tab }]" @click="activeTab = tab">
          {{ tab }}
        </button>
      </div>
      <button class="grid-btn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" />
        </svg>
      </button>
    </div>

    <div class="content-scroll">
      <component :is="currentTabComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MusicContent from '../components/MusicContent.vue'
import PodcastsContent from '../components/PodcastsContent.vue'
import AudiobooksContent from '../components/AudiobooksContent.vue'
import AllContent from '../components/AllContent.vue'

const activeTab = ref('All')
const tabs = ['All', 'Music', 'Podcasts', 'Audiobooks']

const currentTabComponent = computed(() => {
  switch (activeTab.value) {
    case 'Music': return MusicContent
    case 'Podcasts': return PodcastsContent
    case 'Audiobooks': return AudiobooksContent
    default: return AllContent
  }
})
</script>

<style scoped>
.home-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #1a1a1a 0%, #000 50%);
  overflow: hidden;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #1a1a1a;
}

.content-tabs {
  display: flex;
  gap: 8px;
}

.tab {
  padding: 8px 16px;
  border: none;
  border-radius: 50px;
  background: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.tab.active {
  background: #333;
  color: #fff;
}

.tab:hover:not(.active) {
  color: #fff;
}

.grid-btn {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.grid-btn:hover {
  background: #1a1a1a;
  color: #fff;
}

.content-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.content-scroll::-webkit-scrollbar {
  width: 12px;
}

.content-scroll::-webkit-scrollbar-track {
  background: #000;
}

.content-scroll::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 6px;
}

.content-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-width: 768px) {
  .content-header {
    padding: 12px 16px;
  }

  .content-scroll {
    padding: 16px;
  }

  .tab {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>
