<template>
  <div class="player-bar">
    <div class="player-left">
      <div class="now-playing">
        <img
          src="https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
          alt="Now playing" />
        <div class="track-info">
          <span class="track-name">Get Lucky</span>
          <span class="artist-name">Daft Punk</span>
          <span class="album-name">Random Access Memories</span>
        </div>
      </div>
      <div class="player-actions">
        <button class="action-btn like-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.726 0l5.916-7.05a4.228 4.228 0 00.946-3.579z" />
          </svg>
        </button>
        <button class="action-btn pip-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M0 5a2 2 0 012-2h7a2 2 0 012 2v6a2 2 0 01-2 2H2a2 2 0 01-2-2V5zm11.5 5.175l3-1.714a.5.5 0 01.5.429v4.22a.5.5 0 01-.5.429l-3-1.714v-1.65z" />
          </svg>
        </button>
      </div>
    </div>

    <div class="player-center">
      <div class="control-buttons">
        <button class="control-btn shuffle-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M0 3.5A.5.5 0 01.5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 007.556 8a9.624 9.624 0 001.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 017 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 010-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 006.444 8a9.624 9.624 0 00-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 01-.5-.5z" />
            <path
              d="M13 5.466V1.534a.25.25 0 01.41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 01-.41-.192zm0 9v-3.932a.25.25 0 01.41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 01-.41-.192z" />
          </svg>
        </button>
        <button class="control-btn prev-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
            <path
              d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z" />
          </svg>
        </button>
        <button class="control-btn play-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 15A7 7 0 118 1a7 7 0 010 14zM8 0a8 8 0 100 16A8 8 0 008 0z" />
            <path
              d="M5.5 5.5A.5.5 0 016 6v4a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zM10 6a.5.5 0 01-.5.5h-3a.5.5 0 010-1h3A.5.5 0 0110 6z" />
          </svg>
        </button>
        <button class="control-btn next-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
            <path
              d="M4.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L4.404 7.304a.802.802 0 000 1.393z" />
          </svg>
        </button>
        <button class="control-btn repeat-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M11 5.466V4H5a4 4 0 000 8h5.955a.5.5 0 000-1H5a3 3 0 110-6h6.064V5.466a.25.25 0 01.41-.192l1.98 1.64a.25.25 0 010 .384l-1.98 1.64a.25.25 0 01-.41-.192z" />
          </svg>
        </button>
      </div>
      <div class="progress-section">
        <span class="time current-time">4:05</span>
        <!-- <div class="progress-bar">
          <div class="progress-track">
            <div class="progress-fill" style="width: 65%"></div>
            <div class="progress-handle"></div>
          </div>
        </div> -->
        <input type="range" class="text-white">
        <span class="time total-time">6:23</span>
      </div>
    </div>

    <div class="player-right">
      <div class="volume-controls">
        <button class="control-btn queue-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M15 2a1 1 0 00-1-1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2zM0 2a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2zm5.5 1a.5.5 0 00-.5.5v1a.5.5 0 001 0V4h1v.5a.5.5 0 001 0v-1A.5.5 0 007.5 3h-2zM5 7.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
          </svg>
        </button>
        <button class="control-btn device-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M2.5 3A1.5 1.5 0 001 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0015 5.293V4.5A1.5 1.5 0 0013.5 3h-11z" />
            <path
              d="M15 6.954L8.978 9.86a2.25 2.25 0 01-1.956 0L1 6.954V11.5A1.5 1.5 0 002.5 13h11a1.5 1.5 0 001.5-1.5V6.954z" />
          </svg>
        </button>
        <button class="control-btn volume-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M10.717 3.55A.5.5 0 0111 4v8a.5.5 0 01-.812.39L6.825 10.5H5.5A2.5 2.5 0 013 8V7a2.5 2.5 0 012.5-2.5h1.325l3.363-1.89a.5.5 0 01.529-.06z" />
          </svg>
        </button>
        <div class="volume-slider">
          <div class="volume-track">
            <div class="volume-fill" style="width: 70%"></div>
            <div class="volume-handle"></div>
          </div>
        </div>
        <button class="control-btn fullscreen-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M1.5 1a.5.5 0 00-.5.5v4a.5.5 0 01-1 0v-4A1.5 1.5 0 011.5 0h4a.5.5 0 010 1h-4zM10 .5a.5.5 0 01.5-.5h4A1.5 1.5 0 0116 1.5v4a.5.5 0 01-1 0v-4a.5.5 0 00-.5-.5h-4a.5.5 0 01-.5-.5zM.5 10a.5.5 0 01.5.5v4a.5.5 0 00.5.5h4a.5.5 0 010 1h-4A1.5 1.5 0 010 14.5v-4a.5.5 0 01.5-.5zm15 0a.5.5 0 01.5.5v4a1.5 1.5 0 01-1.5 1.5h-4a.5.5 0 010-1h4a.5.5 0 00.5-.5v-4a.5.5 0 01.5-.5z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player-bar {
  height: 90px;
  background: #181818;
  border-top: 1px solid #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  position: relative;
}

input[type="range"] {
  -webkit-appearance: none; /* remove default styling */
  width: 300px;
  height: 8px;
  background: hsl(0,0%,20%); /* track color */
  border-radius: 4px;
  color:white;
  outline: none;
}


.player-left {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 30%;
  min-width: 180px;
}

.now-playing {
  display: flex;
  align-items: center;
  gap: 12px;
}

.now-playing img {
  width: 56px;
  height: 56px;
  border-radius: 4px;
}

.track-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.track-name {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
}

.artist-name {
  color: #b3b3b3;
  font-size: 11px;
  font-weight: 400;
}

.album-name {
  color: #b3b3b3;
  font-size: 11px;
  font-weight: 400;
}

.player-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: #b3b3b3;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.action-btn:hover {
  color: #fff;
}

.player-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 40%;
  max-width: 722px;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.control-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: #b3b3b3;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.control-btn:hover {
  color: #fff;
}

.play-btn {
  width: 32px;
  height: 32px;
  background: #fff;
  color: #000;
}

.play-btn:hover {
  transform: scale(1.06);
}

.progress-section {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.time {
  color: #b3b3b3;
  font-size: 11px;
  font-weight: 400;
  width: 40px;
  text-align: center;
}

.progress-bar {
  flex: 1;
  height: 12px;
  display: flex;
  align-items: center;
}

.progress-track {
  width: 100%;
  height: 4px;
  background: #4f4f4f;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background: #fff;
  border-radius: 2px;
  position: relative;
}

.progress-handle {
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s;
}

.progress-bar:hover .progress-handle {
  opacity: 1;
}

.player-right {
  display: flex;
  align-items: center;
  width: 30%;
  min-width: 180px;
  justify-content: flex-end;
}

.volume-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-slider {
  width: 93px;
  height: 12px;
  display: flex;
  align-items: center;
}

.volume-track {
  width: 100%;
  height: 4px;
  background: #4f4f4f;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.volume-fill {
  height: 100%;
  background: #fff;
  border-radius: 2px;
  position: relative;
}

.volume-handle {
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s;
}

.volume-slider:hover .volume-handle {
  opacity: 1;
}
</style>
