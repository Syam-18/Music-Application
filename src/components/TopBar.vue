<template>
  <div class="topbar">
    <div class="flex">
    <div class="nav-buttons mr-4">
      <button class="nav-btn" @click="$router.go(-1)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"
          />
        </svg>
      </button>
      <button class="nav-btn" @click="$router.go(+1)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"
          />
        </svg>
      </button>
    </div>

    <div class="center-nav ml-4">
      <button
        class="center-nav-btn"
        :class="{ active: $route.name === 'Home' }"
        @click="$router.push('/')"
      >
        <i class="fa-solid fa-house"></i>
        Home
      </button>
      <button
        class="center-nav-btn"
        :class="{ active: $route.name === 'Search' }"
        @click="changeSearchPath"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
        Discover
      </button>
    </div>

    <div class="search-container" >
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass search-icon mr-auto"></i>
        <input
          type="text"
          placeholder="Search..."
          @click="changeSearchPath"
          v-model="searchQuery"
        />
      </div>
    </div>
  </div>

    <div class="user-controls">
      <div class="profile" v-if="store.user" @click="showUserMenu = !showUserMenu">
        <img :src="store.user.image" :alt="store.user.name" />
      </div>
      <button v-else class="login-btn" @click="$router.push('/login')">LogOut</button>

      <div v-if="showUserMenu" class="user-menu items-end">
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
  },
  { immediate: true },
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
  } else {
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
  margin-right:20px;
}

.center-nav-btn {
  display: flex;
  align-items: baseline;
  justify-content: start;
  gap: 8px;
  padding: 8px 16px;
  padding-right: 60px;
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}

.center-nav-btn.active {
  background:hsl(0, 0%, 20%);
  color: white;
}

.center-nav-btn:hover:not(.active) {
  color: #fff;
}

.search-container {

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
  border: none;
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
