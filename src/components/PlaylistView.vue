<script setup>
import router from '@/router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const playlistId = computed(() => route.params.playlistId)

// Mock playlist data - in a real app this would come from an API
const playlist = computed(() => {
  return {
    id: playlistId.value,
    name: "Hot Hits Hindi",
    image: 'https://i.pinimg.com/1200x/44/ab/b0/44abb077862263e523e0ec10f54901ce.jpg',
    description: "Hottest Hindi music that India is listening to. Cover - Saiyaara"
  }
})

const songs = [
  {
    id: "1D35BJlymlh6OLD75WupSF",
    title: 'Saiyaara (From "Saiyaara")',
    artist: 'Tanishk Bagchi, Faheem Abdullah, Arslan Nizami, Irshad Kamil',
    album: 'Saiyaara (From "Saiyaara")',
    duration: '6:11',
    dateAdded: '2 days ago',
    image: 'https://i.pinimg.com/736x/bd/94/99/bd9499979d473d913653a3f11b6a20c0.jpg'
  },
  {
    id: "1bMkimTb47umgNP6xCi4A1",
    title: 'Arz Kiya Hai | Coke Studio Bharat',
    artist: 'Anuv Jain',
    album: 'Arz Kiya Hai | Coke Studio Bharat',
    duration: '4:55',
    dateAdded: '2 days ago',
    image: 'https://i.pinimg.com/736x/0d/bd/62/0dbd6213554d621423bb825d243ce4c0.jpg'
  },
  {
    id: "2ceeTJAzKy295Fm0VsaXtE",
    title: 'Tum Se',
    artist: 'Mohit Chauhan',
    album: 'Jab We Met',
    duration: '5:22',
    dateAdded: '1 week ago',
    image: 'https://i.pinimg.com/736x/a7/04/60/a70460bf2e32805e2db0778a3a821716.jpg'
  },
  {
    id: "0yInnVUPqOxW9mFZ440hSi",
    title: 'Raabta',
    artist: 'Arijit Singh',
    album: 'Agent Vinod',
    duration: '4:18',
    dateAdded: '1 week ago',
    image: 'https://i.pinimg.com/736x/f4/63/d3/f463d3acca8d37ed8673c6bf7b7b2c37.jpg'
  },
  {
    id: "7F8RNvTQlvbeBLeenycvN6",
    title: 'Kun Faya Kun',
    artist: 'A.R. Rahman, Javed Ali, Mohit Chauhan',
    album: 'Rockstar',
    duration: '7:53',
    dateAdded: '2 weeks ago',
    image: 'https://i.pinimg.com/736x/d7/f4/29/d7f429b8db536439059541260bd6419c.jpg'
  },
  {
    id: "25MPTnqXQB1H6OkwSYUXWx",
    title: 'Malang',
    artist: 'Arijit Singh, Asees Kaur',
    album: 'Dhoom 3',
    duration: '4:42',
    dateAdded: '2 weeks ago',
    image: 'https://i.pinimg.com/1200x/45/a8/be/45a8be9b7708bc2f429b2a80d19db405.jpg'
  },
  {
    id: "1plFCZ6QFAjSRutT02GTCn",
    title: 'Channa Mereya',
    artist: 'Arijit Singh',
    album: 'Ae Dil Hai Mushkil',
    duration: '4:49',
    dateAdded: '3 weeks ago',
    image: 'https://i.pinimg.com/1200x/7e/21/b3/7e21b3f90ca7656f09826c25f9b41081.jpg'
  },
  {
    id: "6871FKHumiy1Wfr6vF7Xxt",
    title: 'Hawayein',
    artist: 'Arijit Singh',
    album: 'Jab Harry Met Sejal',
    duration: '3:58',
    dateAdded: '3 weeks ago',
    image: 'https://i.pinimg.com/1200x/26/07/df/2607df2df1b716cf0f6cfe7c251aaa57.jpg'
  },
  {
    id: "6V0cw3ZOtm5oQJrSv4QluQ",
    title: 'Gerua',
    artist: 'Arijit Singh, Antara Mitra',
    album: 'Dilwale',
    duration: '4:55',
    dateAdded: '1 month ago',
    image: 'https://i.pinimg.com/1200x/e4/33/83/e43383230834e0bb6804fe4037e5a95b.jpg'
  },
  {
    id: "3oWxFNsXstcancCR1wODR4",
    title: 'Tera Ban Jaunga',
    artist: 'Akhil Sachdeva, Tulsi Kumar',
    album: 'Kabir Singh',
    duration: '3:56',
    dateAdded: '1 month ago',
    image: 'https://i.pinimg.com/1200x/c8/8b/36/c88b36048ff2f5343dcf4f45b19c2701.jpg'
  }
]
</script>

<template>
  <div class="bg-[#121212] overflow-y-auto">
    <!-- Header -->
    <div class="flex md:flex-row flex-col gap-8 mb-8 p-6 rounded-none md:text-left text-center"
      :style="{background:`linear-gradient(135deg, #ff8c42 0%, #ff6b1a 100%)`}">

      <!-- Playlist Image -->
      <div
        class="flex-shrink-0 shadow-[0_4px_60px_rgba(0,0,0,0.5)] mx-auto md:mx-0 rounded-md w-40 md:w-48 lg:w-56 h-40 md:h-48 lg:h-56 overflow-hidden">
        <img :src="playlist.image" :alt="playlist.name" class="w-full h-full object-cover" />
      </div>

      <!-- Playlist Info -->
      <div class="flex flex-col justify-end text-white">
        <p class="opacity-90 mb-2 font-bold text-[12px] uppercase">Public Playlist</p>
        <h1 class="mb-6 font-black text-[32px] sm:text-[48px] md:text-[72px] lg:text-[96px] leading-[0.9]">
          {{ playlist.name }}
        </h1>
        <p class="opacity-70 mb-2 text-sm">{{ playlist.description }}</p>
        <div class="flex items-center gap-1 opacity-70 text-sm">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.32 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span>Spotify • 2,859,496 saves • 50 songs, 3 hr 9 min</span>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex items-center gap-8 mb-6 p-6">
      <button
        class="flex justify-center items-center bg-[#1db954] hover:bg-[#1ed760] rounded-full w-14 h-14 text-black hover:scale-105 transition transform">
        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>

      <button
        class="hover:bg-white/10 p-2 rounded-full text-[#b3b3b3] hover:text-white transition-colors">
        <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      <button
        class="hover:bg-white/10 p-2 rounded-full text-[#b3b3b3] hover:text-white transition-colors">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </button>
    </div>

    <!-- Songs -->
    <div class="p-6">
      <!-- Header -->
      <div
        class="gap-4 grid grid-cols-[16px_4fr_2fr_1fr_60px] max-md:grid-cols-[16px_1fr_60px] mb-4 p-4 font-normal text-[#b3b3b3] text-xs uppercase tracking-wider">
        <div>#</div>
        <div>Title</div>
        <div class="hidden md:block">Album</div>
        <div class="hidden md:block">Date added</div>
        <div>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
          </svg>
        </div>
      </div>

      <hr class="m-4 border-white/10 border-t" />

      <!-- Songs list -->
      <div class="flex flex-col">
        <div v-for="(song, index) in songs" :key="song.id" @click="router.push(`/track/${song.id}`)"
          class="items-center gap-4 grid grid-cols-[16px_4fr_2fr_1fr_60px] max-md:grid-cols-[16px_1fr_60px] hover:bg-white/10 p-4 rounded min-h-[56px] transition cursor-pointer">
          <div class="text-[#b3b3b3] text-base text-right">{{ index + 1 }}</div>

          <!-- Song info -->
          <div class="flex items-center gap-3 min-w-0">
            <img :src="song.image" :alt="song.title" class="flex-shrink-0 rounded w-10 h-10 object-cover" />
            <div class="flex-1 min-w-0">
              <div class="text-white text-base truncate">{{ song.title }}</div>
              <div class="text-[#b3b3b3] text-sm truncate">{{ song.artist }}</div>
            </div>
          </div>

          <div class="hidden md:block text-[#b3b3b3] text-sm truncate">{{ song.album }}</div>
          <div class="hidden md:block text-[#b3b3b3] text-sm">{{ song.dateAdded }}</div>
          <div class="text-[#b3b3b3] text-sm text-right">{{ song.duration }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
