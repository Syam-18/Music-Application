<template>
  <div class="sidebar md:flex flex-col">
    <div class="sidebar-header">
      <div class="flex">
        <div class="flex items-center gap-3 text-[#b3b3b3] font-[700]">
          <i class="fa-solid fa-folders text-lg"></i>
          <span class="text-lg">My Library</span>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <button class="nav-item" @click="$router.push('/liked-songs')">
        <i class="fa-solid fa-heart text-[18px]"></i>
        <span class="text-left">Liked songs</span>
      </button>

      <button class="nav-item" @click="$router.push(`/saved-albums`)">
        <i class="fa-solid fa-album-collection text-[18px]"></i>
        <span class="text-left">Albums</span>
      </button>

      <button class="nav-item" @click="$router.push(`/following-artists`)">
        <i class="fa-solid fa-user-music text-[18px]"></i>
        <span class="text-left">Artists</span>
      </button>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  min-width: 200px;
  max-width: 300px;
  background: #000;
  display: flex;
  flex-direction: column;
  border-right: 1px solid hsl(0, 0%, 20%);
  display: none;
  padding: 20px;
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
  margin-bottom: 10px;
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
