<template>
  <div class="topbar">
    <div class="nav-buttons">
      <button class="nav-btn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"
          />
        </svg>
      </button>
      <button class="nav-btn disabled">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"
          />
        </svg>
      </button>
    </div>

    <div class="center-nav">
      <button
        class="center-nav-btn"
        :class="{ active: $route.name === 'Home' }"
        @click="$router.push('/')"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33z"
          />
        </svg>
        Home
      </button>
      <button
        class="center-nav-btn"
        :class="{ active: $route.name === 'Search' }"
        @click="changeSearchPath"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"
          />
        </svg>
        Discover
      </button>
    </div>

    <div class="search-container">
      <div class="search-box">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M10.68 11.74a6 6 0 01-7.922-8.982 6 6 0 018.982 7.922l3.04 3.04a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L10.68 11.74zm-2.49-8.993a4.5 4.5 0 00-6.37 6.37 4.5 4.5 0 006.37-6.37z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          @click="changeSearchPath"
          v-model="searchQuery"
        />
      </div>
    </div>

    <div class="user-controls">
      <button class="control-btn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z"
          />
          <path
            d="M8 1.918l-.797.161A4.002 4.002 0 004 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 00-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0113 6c0 .88.32 4.2 1.22 6z"
          />
        </svg>
      </button>
      <button class="control-btn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M8 1.918l-.797.161A4.002 4.002 0 004 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 00-3.203-3.92L8 1.917z"
          />
        </svg>
      </button>
      <button class="control-btn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 01-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 01.872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 012.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 012.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 01.872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 01-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 01-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 100-5.86 2.929 2.929 0 000 5.858z"
          />
        </svg>
      </button>
      <div class="profile" v-if="store.user" @click="showUserMenu = !showUserMenu">
        <img :src="store.user.image" :alt="store.user.name" />
      </div>
      <button v-else class="login-btn" @click="$router.push('/login')">LogOut</button>

      <div v-if="showUserMenu" class="user-menu">
        <div class="user-menu-item" @click="logout">Logout</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/stores'

const showUserMenu = ref(false)
const route = useRoute()
const router = useRouter()
const searchQuery = ref(route.params.id ?? '')
const tracks = ref([])

// Watch for typing changes
watch(searchQuery, (newValue) => {
  if (route.name === 'Search' || route.name === 'SearchResults') {
    if (newValue && newValue.trim() !== '') {
      router.push(`/search/${newValue}`)
    } else {
      router.push(`/search`)
    }
  }
})

watch(
  () => route.params.id,
  (newId) => {
    if (route.name === 'Search' || route.name === 'SearchResults') {
      searchQuery.value = newId || ''
      getTracks(newId)
    }
  }, { immediate: true }
)

onMounted(() => {
  if (route.name === 'SearchResults') {
    searchQuery.value = route.params.id
    getTracks(route.params.id)
  }
})

const changeSearchPath = () => {
  if (route.name === 'SearchResults') {
    router.push(`/search/${router.params.id}`)
  }
  else {
    router.push('/search')
  }
}

const getAccessToken = async () => {
  const url = 'https://accounts.spotify.com/api/token'
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: '138c665e559f48ecb1bfe23378edfff9',
      client_secret: '193754eb82e0496ab5236eec396c12b5',
      grant_type: 'client_credentials',
    }),
  }

  const response = await fetch(url, options)
  const data = await response.json()

  localStorage.setItem('accessToken', data.access_token)
  localStorage.setItem('tokenExpiry', Date.now() + data.expires_in * 1000)

  return data.access_token
}

const getTracks = async (query) => {
  if (!query) {
    tracks.value = []
    return
  }

  let token = localStorage.getItem('accessToken')
  const expiry = localStorage.getItem('tokenExpiry')

  if (!token || Date.now() > expiry) {
    token = await getAccessToken()
  }

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=15`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  const data = await res.json()
  tracks.value = data.tracks.items
}

const logout = () => {
  store.logout()
  showUserMenu.value = false
  router.push('/login')
}
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #1a1a1a;
}

.nav-buttons {
  display: flex;
  gap: 8px;
}

.nav-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1a1a1a;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.nav-btn:hover:not(.disabled) {
  background: #333;
}

.nav-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.center-nav {
  display: flex;
  gap: 8px;
}

.center-nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 50px;
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.center-nav-btn.active {
  background: #fff;
  color: #000;
}

.center-nav-btn:hover:not(.active) {
  color: #fff;
}

.search-container {
  flex: 1;
  max-width: 400px;
  margin: 0 32px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #b3b3b3;
  z-index: 1;
}

.search-box input {
  width: 100%;
  padding: 8px 12px 8px 40px;
  border-radius: 50px;
  border: none;
  background: #2a2a2a;
  color: #fff;
  font-size: 14px;
}

.search-box input:focus {
  outline: none;
  background: #333;
}

.search-box input::placeholder {
  color: #b3b3b3;
}

.user-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.control-btn:hover {
  color: #fff;
  background: #1a1a1a;
}

.profile img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
}

.login-btn {
  padding: 8px 16px;
  border: 1px solid #727272;
  border-radius: 50px;
  background: white;
  color: black;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.2s;
}

.login-btn:hover {
  border-color: #fff;
  transform: scale(1.04);
}

.user-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #282828;
  border-radius: 4px;
  padding: 4px 0;
  min-width: 120px;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.user-menu-item {
  padding: 12px 16px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.user-menu-item:hover {
  background: #3e3e3e;
}
</style>
