<template>
  <div class="home-container">
    <div class="content-scroll">
      <AllContent />
    </div>
  </div>
</template>

<script setup>
import AllContent from '../components/AllContent.vue'

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
