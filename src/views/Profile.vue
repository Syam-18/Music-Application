<template>
  <div class="min-h-screen bg-black text-white md:p-8 space-y-8">
    <!-- Profile Header -->
    <div
      class="relative bg-gradient-to-b from-gray-800 to-black p-6 md:p-8 flex flex-col md:flex-row md:items-end gap-4 md:gap-8 rounded-lg"
    >
      <!-- Editable Avatar -->
      <div class="relative">
        <img
          :src="user.avatar"
          alt="Profile Picture"
          class="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg border-4 border-black cursor-pointer object-cover"
          @click="triggerFileInput"
        />
        <input
          type="file"
          ref="fileInput"
          placeholder="Pic"
          class="hidden"
          accept="image/*"
          @change="updateAvatar"
        />
      </div>

      <div class="flex-1 text-center md:text-left space-y-3">
        <p class="uppercase text-xs md:text-sm font-semibold text-gray-400">Profile</p>

        <!-- Editable Name -->
        <div class="flex items-center justify-center md:justify-start gap-2">
          <input
            v-if="editingName"
            v-model="editableName"
            @keyup.enter="saveName"
            @blur="saveName"
            class="bg-transparent border-b border-gray-500 focus:outline-none text-3xl md:text-5xl font-bold"
            autofocus
          />
          <h1
            v-else
            class="text-3xl md:text-5xl font-bold cursor-pointer hover:underline"
            @click="startEditing"
          >
            {{ user.name }}
          </h1>
        </div>

        <!-- Stats -->
        <div
          class="mt-2 md:mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-gray-300 text-sm md:text-base"
        >
          <span>{{ user.followers }} Followers</span>
          <span>{{ user.following }} Following</span>
          <span>{{ likedAlbums.length }} Liked Albums</span>
        </div>
      </div>
    </div>

    <!-- Liked Albums Section -->
    <div class="space-y-4 p-4 rounded-lg">
      <h2 class="text-xl md:text-2xl mb-2 font-bold">Liked Albums</h2>
      <div v-if="loading" class="text-gray-400 p-4">Loading liked albums...</div>
      <div v-else>
        <div
          v-if="likedAlbums.length"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <div
            v-for="album in likedAlbums"
            :key="album.id"
            class="bg-zinc-900 hover:bg-zinc-800 p-4 rounded-lg cursor-pointer transition"
            @click="router.push(`/album/${album.id}`)"
          >
            <img
              :src="album.images?.[0]?.url || fallbackImage"
              alt="Album Cover"
              class="w-full h-36 md:h-40 object-cover rounded-md mb-2"
            />
            <h3 class="font-semibold text-white truncate mb-1">{{ album.name }}</h3>
            <p class="text-xs md:text-sm text-gray-400">{{ getArtistNames(album.artists) }}</p>
          </div>
        </div>

        <div v-else class="text-gray-400 p-4">You haven’t liked any albums yet.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth } from '@/firebase'
import { updateProfile, onAuthStateChanged } from 'firebase/auth'
import { getAlbums } from '@/services/musicService'
import { saveUserProfile } from '@/services/userService'

const router = useRouter()
const fallbackImage = 'https://via.placeholder.com/300x300?text=No+Image'

// ----------------------
// PROFILE STATE
// ----------------------
const user = ref({
  name: 'User Name',
  avatar: fallbackImage,
  followers: 0,
  following: 0,
})

const editingName = ref(false)
const editableName = ref(user.value.name)

const likedAlbums = ref([])
const loading = ref(true)

// ----------------------
// LOCALSTORAGE LOAD
// ----------------------
const cachedName = localStorage.getItem('userName')
const cachedAvatar = localStorage.getItem('userAvatar')

if (cachedName) {
  user.value.name = cachedName
  editableName.value = cachedName
}

if (cachedAvatar) {
  user.value.avatar = cachedAvatar
}

// ----------------------
// NAME EDITING
// ----------------------
const startEditing = () => {
  editableName.value = user.value.name
  editingName.value = true
}

const saveName = async () => {
  if (!editableName.value.trim() || !auth.currentUser) return

  const newName = editableName.value.trim()
  user.value.name = newName
  editableName.value = newName
  editingName.value = false

  // Save locally
  localStorage.setItem('userName', newName)

  try {
    // Update Firebase Auth
    await updateProfile(auth.currentUser, { displayName: newName })
    // Save to Firestore
    await saveUserProfile(auth.currentUser)
  } catch (err) {
    console.error('Failed to update name:', err)
  }
}

// ----------------------
// AVATAR UPLOAD
// ----------------------
const fileInput = ref(null)
const triggerFileInput = () => fileInput.value.click()

const saveAvatar = async (file) => {
  if (!file || !auth.currentUser) return
  try {
    const storage = getStorage()
    const fileRef = storageRef(storage, `avatars/${auth.currentUser.uid}`)
    await uploadBytes(fileRef, file)
    const url = await getDownloadURL(fileRef)

    // Update Auth
    await updateProfile(auth.currentUser, { photoURL: url })
    // Update Firestore
    await saveUserProfile(auth.currentUser)

    user.value.avatar = url
    localStorage.setItem('userAvatar', url)
  } catch (err) {
    console.error('Failed to save avatar:', err)
  }
}

const updateAvatar = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Instant preview
  const reader = new FileReader()
  reader.onload = (e) => {
    user.value.avatar = e.target.result
  }
  reader.readAsDataURL(file)

  // Persist in background
  saveAvatar(file)
}

// ----------------------
// Liked Albums
// ----------------------
const getArtistNames = (artists) => artists?.map((a) => a.name).join(', ') || 'Unknown'

const CLIENT_ID = '138c665e559f48ecb1bfe23378edfff9'
const CLIENT_SECRET = '193754eb82e0496ab5236eec396c12b5'

const getAccessToken = async () => {
  const url = 'https://accounts.spotify.com/api/token'
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  }

  const response = await fetch(url, options)
  const data = await response.json()
  localStorage.setItem('accessToken', data.access_token)
  localStorage.setItem('tokenExpiry', Date.now() + data.expires_in * 1000)
  return data.access_token
}

const loadLikedAlbums = async () => {
  loading.value = true
  try {
    const albumIds = await getAlbums()
    if (!albumIds.length) {
      likedAlbums.value = []
      return
    }

    const token = await getAccessToken()
    const responses = await Promise.all(
      albumIds.map((id) =>
        fetch(`https://api.spotify.com/v1/albums/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json()),
      ),
    )

    likedAlbums.value = responses.filter((a) => a && a.id)
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

// ----------------------
// FIREBASE AUTH SYNC
// ----------------------
onMounted(() => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      likedAlbums.value = []
      loading.value = false
      return
    }

    // Update name/avatar if not in localStorage
    if (!cachedName && currentUser.displayName) {
      user.value.name = currentUser.displayName
      editableName.value = currentUser.displayName
      localStorage.setItem('userName', currentUser.displayName)
    }

    if (!cachedAvatar && currentUser.photoURL) {
      user.value.avatar = currentUser.photoURL
      localStorage.setItem('userAvatar', currentUser.photoURL)
    }

    await loadLikedAlbums()
  })
})
</script>
