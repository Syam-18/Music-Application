<template>
  <div class="sidebar md:flex flex-col">
    <div class="sidebar-header">
      <div class="flex items-center">
        <div class="flex items-center gap-3 text-[#b3b3b3] font-[700]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M3 22a1 1 0 01-1-1V3a1 1 0 011-1h3v20H3zM7 2a1 1 0 011-1h12a1 1 0 011 1v20a1 1 0 01-1 1H8a1 1 0 01-1-1V2zm2 2v16h10V4H9z" />
          </svg>
          <span class="text-lg">My Library</span>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">

      <div class="nav-item" @click="$router.push('/liked-songs')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span>Liked songs</span>
      </div>

      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span>Albums</span>
      </div>

      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span>Artists</span>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  min-width:200px;
  max-width: 300px;
  background: #000;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #1a1a1a;
  display: none;
  padding:20px;
}

@media (min-width: 768px) {
  .sidebar {
    display: flex;
  }
}

.sidebar-header {
  margin-bottom: 32px;
}







.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  color: #b3b3b3;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom:10px;
  font-size: 14px;
}

.nav-item:hover {
  color: #fff;
}

.nav-item.active {
  color: #fff;
}

.nav-item span {
  flex: 1;
}

.chevron {
  opacity: 0;
  transition: opacity 0.2s;
}

.nav-item:hover .chevron {
  opacity: 1;
}
</style>
