<script setup>
import { ref, onMounted } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { useRoute } from "vue-router";
import { auth } from "@/firebase.js";
import { saveUserProfile } from "@/services/userService";
import { addSongToPlaylist, getPlaylistSongs } from "@/services/musicService";
import { store } from "@/stores";

const route = useRoute();
const loading = ref(true);

const playlist = ref({
  id: "my_playlist",
  name: "My Playlist",
  owner: "You",
  image:
    "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2",
  songs: [],
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await saveUserProfile(user);
    await loadSongs();
  } else {
    playlist.value.songs = [];
  }
  loading.value = false;
});

async function loadSongs() {
  const songs = await getPlaylistSongs("my_playlist");
  playlist.value.songs = songs.map((s, idx) => ({
    id: idx + 1,
    title: `Song ${s}`,
    artist: "Unknown Artist",
    album: "Unknown Album",
    duration: "3:45",
    image:
      "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
    liked: false,
  }));
}

async function addSongHandler() {
  loading.value = true;
  await addSongToPlaylist("my_playlist", "song_999");
  await loadSongs();
  loading.value = false;
}

const playAll = () => {
  if (playlist.value.songs?.length > 0) {
    store.playSong(playlist.value.songs[0]);
  }
};

const playSong = (song) => {
  store.playSong(song);
};

const toggleLike = (songId) => {
  const song = playlist.value.songs.find((s) => s.id === songId);
  if (song) {
    song.liked = !song.liked;
  }
};

onMounted(() => {
  console.log("Loading playlist:", route.params.id || "my_playlist");
});
</script>

<template>
  <div class="playlist-container">
    <!-- Header -->
    <div class="playlist-header">
      <div class="header-content">
        <div class="playlist-image">
          <img :src="playlist.image" :alt="playlist.name" />
        </div>
        <div class="playlist-info">
          <span class="playlist-type">Playlist</span>
          <h1>{{ playlist.name }}</h1>
          <div class="playlist-meta">
            <span>{{ playlist.owner }}</span>
            <span>•</span>
            <span v-if="!loading">{{ playlist.songs?.length || 0 }} songs</span>
            <span v-else>Loading...</span>
          </div>
          <button class="playlist-btn" @click="addSongHandler">
            + Add Demo Song
          </button>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="playlist-controls">
      <button class="play-button" @click="playAll">
        ▶
      </button>
      <button class="shuffle-button">🔀</button>
      <button class="more-button">⋮</button>
    </div>

    <!-- Songs Table -->
    <div class="songs-table" v-if="playlist.songs?.length">
      <div class="table-header">
        <div class="col-index">#</div>
        <div class="col-title">Title</div>
        <div class="col-album">Album</div>
        <div class="col-duration">⏱</div>
      </div>

      <div class="songs-list">
        <div
          v-for="(song, index) in playlist.songs"
          :key="song.id"
          class="song-row"
          @click="playSong(song)"
        >
          <div class="col-index">
            <span class="track-number">{{ index + 1 }}</span>
            <button class="play-btn">▶</button>
          </div>
          <div class="col-title">
            <img :src="song.image" :alt="song.title" />
            <div class="song-info">
              <span class="song-title">{{ song.title }}</span>
              <span class="song-artist">{{ song.artist }}</span>
            </div>
          </div>
          <div class="col-album">{{ song.album }}</div>
          <div class="col-duration">
            <button
              class="like-btn"
              :class="{ liked: song.liked }"
              @click.stop="toggleLike(song.id)"
            >
              ♥
            </button>
            <span class="duration">{{ song.duration }}</span>
            <button class="more-btn">⋮</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading" class="empty">
      <p>No songs in this playlist yet. Add one 🎵</p>
    </div>

    <!-- Navigation -->
    <div class="nav-link">
      <router-link to="/home">⬅ Back to Home</router-link>
    </div>
  </div>
</template>



<style scoped>
/* I kept your Spotify-like UI styles from the 2nd code
   and merged the extra button + empty state styling */
.playlist-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #5038a0 0%, #181818 300px);
  overflow: hidden;

  color: #fff;
}


.playlist-btn {
  background: #1db954;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 1rem;
}

.playlist-btn:hover {
  background: #1ed760;
}

.empty {
  text-align: center;
  padding: 2rem;
  color: #aaa;
  font-style: italic;
}
</style>
