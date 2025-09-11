<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="library-section">
        <div class="library-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M3 22a1 1 0 01-1-1V3a1 1 0 011-1h3v20H3zM7 2a1 1 0 011-1h12a1 1 0 011 1v20a1 1 0 01-1 1H8a1 1 0 01-1-1V2zm2 2v16h10V4H9z" />
          </svg>
          <span>My Library</span>
        </div>
        <button class="create-btn">+</button>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-item active">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33z" />
        </svg>
        <span>Pins</span>
        <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="m6 13 5-5-5-5-1 1 4 4-4 4 1 1z" />
        </svg>
      </div>

      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
        </svg>
        <span>Playlists</span>
        <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="m6 13 5-5-5-5-1 1 4 4-4 4 1 1z" />
        </svg>
      </div>

      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span>Liked songs</span>
      </div>

      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V7h10v2z" />
        </svg>
        <span>Saves</span>
      </div>

      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span>Albums</span>
      </div>

      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
        </svg>
        <span>Folders</span>
      </div>

      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span>Podcasts</span>
      </div>

      <div class="nav-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
        </svg>
        <span>Audiobooks</span>
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
  width: 240px;
  background: #000;
  padding: 24px 8px 24px 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #1a1a1a;
}

.sidebar-header {
  margin-bottom: 32px;
}

.library-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.library-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #b3b3b3;
  font-size: 16px;
  font-weight: 700;
}

.create-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: none;
  border: none;
  color: #b3b3b3;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.create-btn:hover {
  background: #1a1a1a;
  color: #fff;
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
  padding: 8px 12px;
  border-radius: 4px;
  color: #b3b3b3;
  cursor: pointer;
  transition: all 0.2s;
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
