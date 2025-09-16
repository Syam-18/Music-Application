<template>
  <div class="liked-songs-container">
    <!-- Header -->
    <div class="liked-songs-header">
      <div class="header-content">
        <div class="playlist-image">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor">
            <path
              d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.726 0l5.916-7.05a4.228 4.228 0 00.946-3.579z" />
          </svg>
        </div>
        <div class="playlist-info">
          <span class="playlist-type">Playlist</span>
          <h1>Liked Songs</h1>
          <div class="playlist-meta">
            <span>{{ userRef?.displayName || 'User' }}</span>
            <span>•</span>
            <span>{{ liked.length }} songs</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="playlist-controls">
      <button class="play-button" @click="playAll" :disabled="liked.length === 0">
        ▶
      </button>
      <button class="shuffle-button">🔀</button>
      <button class="more-button">⋮</button>
    </div>

    <!-- Song Table -->
    <div class="songs-table">
      <div class="table-header">
        <div class="col-index">#</div>
        <div class="col-title">Title</div>
        <div class="col-album">Album</div>
        <div class="col-duration">⏱</div>
      </div>

      <div class="songs-list">
        <div
          v-for="(song, index) in liked"
          :key="song.id"
          class="song-row"
          @dblclick="playSong(song)"
        >
          <div class="col-index">
            <span class="track-number">{{ index + 1 }}</span>
          </div>
          <div class="col-title">
            <img :src="song.image || 'https://via.placeholder.com/40'" />
            <div class="song-info">
              <span class="song-title">{{ song.title || 'Unknown Title' }}</span>
              <span class="song-artist">{{ song.artist || 'Unknown Artist' }}</span>
            </div>
          </div>
          <div class="col-album">{{ song.album || '-' }}</div>
          <div class="col-duration">
            <button class="like-btn" :class="{ liked: true }" @click.stop="toggleLike(song.id)">
              ❤
            </button>
            <span class="duration">{{ song.duration || "3:00" }}</span>
          </div>
        </div>

        <div v-if="!loading && liked.length === 0" class="empty">
          💔 No liked songs yet
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase.js";
import { saveUserProfile } from "@/services/userService";
import { likeSong, getLikedSongs } from "@/services/musicService";

const liked = ref([]);
const loading = ref(true);
const userRef = ref(null);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      userRef.value = user;
      await saveUserProfile(user);
      liked.value = await getLikedSongs();
    } catch (err) {
      console.error("Error fetching liked songs:", err);
    }
  } else {
    liked.value = [];
    userRef.value = null;
  }
  loading.value = false;
});

async function toggleLike(songId) {
  try {
    await likeSong(songId);
    liked.value = await getLikedSongs();
  } catch (err) {
    console.error("Error liking/unliking:", err);
  }
}

function playAll() {
  if (liked.value.length > 0) {
    playSong(liked.value[0]);
  }
}

function playSong(song) {
  console.log("Playing song:", song.title);
  // Hook into your global store/player here
}
</script>

<style scoped>
  /* Page */ .liked-songs-page { min-height: 100vh; background: linear-gradient(180deg, #181818 0%, #000 100%); color: white; font-family: "Poppins", "Helvetica Neue", Arial, sans-serif; display: flex; flex-direction: column; animation: fadeIn 0.6s ease-in; }
  /* Header */ .header { background: linear-gradient(135deg, #1db954 0%, #0d341b 100%); padding: 4rem 2rem 3rem; text-align: center; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); } .header h1 { font-size: 3rem; font-weight: 800; margin-bottom: 0.4rem; letter-spacing: -1px; } .header p { font-size: 1rem; color: #ddd; margin-bottom: 1.5rem; } .like-btn { background: #1db954; border: none; padding: 0.8rem 1.6rem; font-size: 1rem; font-weight: 600; color: white; border-radius: 30px; cursor: pointer; transition: all 0.25s ease; box-shadow: 0 4px 15px rgba(29, 185, 84, 0.4); } .like-btn:hover { background: #1ed760; transform: scale(1.05); box-shadow: 0 6px 20px rgba(29, 185, 84, 0.6); }
  /* Songs List */ .songs-list { flex: 1; margin: 3rem auto; max-width: 700px; width: 100%; padding: 0 1.5rem; } .song-card { background: rgba(255, 255, 255, 0.05); border-radius: 14px; padding: 1.2rem 1.5rem; margin-bottom: 1.2rem; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s; backdrop-filter: blur(8px); } .song-card:hover { background: rgba(255, 255, 255, 0.12); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); } .song-info { display: flex; align-items: center; gap: 1rem; } .song-icon { font-size: 1.6rem; } .song-title { font-size: 1.05rem; font-weight: 500; } .liked-badge { background: #1db954; color: white; font-size: 0.8rem; font-weight: 600; padding: 0.4rem 1rem; border-radius: 20px; box-shadow: 0 2px 8px rgba(29, 185, 84, 0.5); }
  /* Empty State */ .empty { text-align: center; padding: 3rem 2rem; background: rgba(255, 255, 255, 0.05); border-radius: 16px; color: #bbb; font-size: 1rem; font-style: italic; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); } .empty small { display: block; margin-top: 0.8rem; color: #888; font-style: normal; }
  /* Navigation */ .nav-link { text-align: center; margin: 2.5rem 0; } .nav-link a { text-decoration: none; color: #bbb; font-weight: 500; transition: color 0.2s; } .nav-link a:hover { color: #fff; }
  /* Animation */ @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
</style>
