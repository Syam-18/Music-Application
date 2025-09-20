<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const categoryName = computed(() => route.params.categoryName)

const category = computed(() => {
  // Find the category data based on the route parameter
  const allCategories = [
    { id: 1, name: 'Music', color: '#e91e63', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 2, name: 'Podcasts', color: '#1b5e20', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 3, name: 'Live Events', color: '#7b1fa2', image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 4, name: 'Made For You', color: '#1565c0', image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 5, name: 'New Releases', color: '#689f38', image: 'https://images.pexels.com/photos/1697558/pexels-photo-1697558.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 6, name: 'Rain & Monsoon', color: '#00695c', image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 7, name: 'Hindi', color: '#e91e63', image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 8, name: 'Telugu', color: '#ff6f00', image: 'https://images.pexels.com/photos/1644775/pexels-photo-1644775.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 9, name: 'Punjabi', color: '#e91e63', image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 10, name: 'Charts', color: '#7b1fa2', image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 11, name: 'Podcast Charts', color: '#1976d2', image: 'https://images.pexels.com/photos/1615776/pexels-photo-1615776.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 12, name: 'Podcast New Releases', color: '#7b1fa2', image: 'https://images.pexels.com/photos/1708988/pexels-photo-1708988.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 13, name: 'Video Podcasts', color: '#d32f2f', image: 'https://images.pexels.com/photos/1662770/pexels-photo-1662770.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 14, name: 'Business & Technology', color: '#616161', image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 15, name: 'Tamil', color: '#ff6f00', image: 'https://images.pexels.com/photos/1481315/pexels-photo-1481315.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 16, name: 'Malayalam', color: '#00838f', image: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 17, name: 'Bhojpuri', color: '#d32f2f', image: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 18, name: 'Ghazals', color: '#616161', image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 19, name: 'Discover', color: '#7b1fa2', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 20, name: 'Summer', color: '#00695c', image: 'https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 21, name: 'Pop', color: '#1976d2', image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 22, name: 'Indie', color: '#d32f2f', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 23, name: 'Love', color: '#e91e63', image: 'https://images.pexels.com/photos/1697558/pexels-photo-1697558.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 24, name: 'Trending', color: '#e91e63', image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 25, name: 'Mood', color: '#e91e63', image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 26, name: 'Party', color: '#7b1fa2', image: 'https://images.pexels.com/photos/1644775/pexels-photo-1644775.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 27, name: 'Devotional', color: '#8d6e63', image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 28, name: 'Decades', color: '#8d6e63', image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 29, name: 'Hip-Hop', color: '#37474f', image: 'https://images.pexels.com/photos/1615776/pexels-photo-1615776.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 30, name: 'Dance/Electronic', color: '#00838f', image: 'https://images.pexels.com/photos/1708988/pexels-photo-1708988.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 31, name: 'Student', color: '#e91e63', image: 'https://images.pexels.com/photos/1662770/pexels-photo-1662770.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 32, name: 'At Home', color: '#1976d2', image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 33, name: 'Country', color: '#ff6f00', image: 'https://images.pexels.com/photos/1481315/pexels-photo-1481315.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 34, name: 'R&B', color: '#8d6e63', image: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 35, name: 'Metal', color: '#d32f2f', image: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 36, name: 'Jazz', color: '#7b1fa2', image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 37, name: 'Classical', color: '#8d6e63', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 38, name: 'Folk & Acoustic', color: '#ff6f00', image: 'https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 39, name: 'Focus', color: '#8d6e63', image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 40, name: 'Disney', color: '#1976d2', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 41, name: 'Soul', color: '#e91e63', image: 'https://images.pexels.com/photos/1697558/pexels-photo-1697558.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 42, name: 'Kids & Family', color: '#1976d2', image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 43, name: 'Anime', color: '#1976d2', image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 44, name: 'TV & Movies', color: '#1b5e20', image: 'https://images.pexels.com/photos/1644775/pexels-photo-1644775.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 45, name: 'Punk', color: '#d32f2f', image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 46, name: 'Ambient', color: '#1b5e20', image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 47, name: 'Blues', color: '#1976d2', image: 'https://images.pexels.com/photos/1615776/pexels-photo-1615776.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 48, name: 'Cooking & Dining', color: '#ff6f00', image: 'https://images.pexels.com/photos/1708988/pexels-photo-1708988.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 49, name: 'Alternative', color: '#d32f2f', image: 'https://images.pexels.com/photos/1662770/pexels-photo-1662770.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 50, name: 'Wellness', color: '#1b5e20', image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 51, name: 'Travel', color: '#1976d2', image: 'https://images.pexels.com/photos/1481315/pexels-photo-1481315.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 52, name: 'Caribbean', color: '#1976d2', image: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 53, name: 'Afro', color: '#8d6e63', image: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 54, name: 'Songwriters', color: '#8d6e63', image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
    { id: 55, name: 'Nature & Noise', color: '#00838f', image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }
  ]

  return allCategories.find(cat => cat.name === categoryName.value) || allCategories[0]
})

const playlistsData = {
  'Hindi': [
    { id: 1, name: "Trending Valentine's Hits", image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Latest romantic Hindi songs" },
    { id: 2, name: "Hot Hits Hindi", image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Hottest Hindi music that India is listening to. Cover - Saiyaara" },
    { id: 3, name: "Bollywood & Chill", image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Relaxing Bollywood tracks" },
    { id: 4, name: "Bollywood Mush", image: 'https://images.pexels.com/photos/1644775/pexels-photo-1644775.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Romantic Bollywood songs" },
    { id: 5, name: "All Out Hindi 90s", image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "90s Hindi hits collection" },
    { id: 6, name: "90s Sad Bollywood", image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Emotional 90s tracks" },
    { id: 7, name: "Bollywood Dance Music", image: 'https://images.pexels.com/photos/1697558/pexels-photo-1697558.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Dance floor Hindi hits" }
  ],
  'Music': [
    { id: 1, name: "Today's Top Hits", image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "The most played songs right now" },
    { id: 2, name: "RapCaviar", image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "New and next in hip-hop" },
    { id: 3, name: "All Out 2010s", image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "The biggest songs of the 2010s" },
    { id: 4, name: "Rock Classics", image: 'https://images.pexels.com/photos/1644775/pexels-photo-1644775.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Rock legends & epic songs" },
    { id: 5, name: "Chill Hits", image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Kick back to the best new and recent chill hits" },
    { id: 6, name: "Viva Latino", image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Today's top Latin hits" },
    { id: 7, name: "Peaceful Piano", image: 'https://images.pexels.com/photos/1697558/pexels-photo-1697558.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Relax and indulge with beautiful piano pieces" }
  ]
}

const newTrending = [
  { id: 8, name: "New Music Hindi", image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Latest Hindi songs, fresh from the recording..." },
  { id: 9, name: "Hot Hits Hindi", image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Hottest Hindi music that India is listening to. Cover..." },
  { id: 10, name: "Bollywood Central", image: 'https://images.pexels.com/photos/1615776/pexels-photo-1615776.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Bollywood Central, jab baje toh seedha dil ke..." },
  { id: 11, name: "New Music Friday I-Pop", image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Latest music from Shekhar Ravjiani, Shael,..." },
  { id: 12, name: "New in Dance", image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Get ready to turn up the desi flavor with 'Panwadi..." },
  { id: 13, name: "Latest Love Tunes", image: 'https://images.pexels.com/photos/1708988/pexels-photo-1708988.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "The melody of love is blooming. Listen to..." },
  { id: 14, name: "New Rap Hindi", image: 'https://images.pexels.com/photos/1662770/pexels-photo-1662770.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', description: "Naya Hip-Hop Hindi! Cover: Muhfaad" }
]

const bollywoodRomance = [
  { id: 15, name: "Bollywood Romance Mix", image: 'https://i.pinimg.com/736x/8f/99/16/8f99161f77fca71cac525fb72f30d344.jpg', description: "Most romantic Bollywood songs" },
  { id: 16, name: "Classic Love Songs", image: 'https://i.pinimg.com/1200x/46/ac/0a/46ac0ae487977ec6acc19faa3bdd2fa1.jpg', description: "Timeless romantic melodies" },
  { id: 17, name: "Modern Romance", image: 'https://i.pinimg.com/1200x/ed/8d/3b/ed8d3b431c2b568ac6c6f155470d3135.jpg', description: "Contemporary love songs" },
  { id: 18, name: "Romantic Duets", image: 'https://i.pinimg.com/736x/bc/b1/73/bcb17389fc70d505a6d6f3be22e555e5.jpg', description: "Beautiful duet songs" },
  { id: 19, name: "Wedding Songs", image: 'https://i.pinimg.com/1200x/c6/be/e4/c6bee4122bffd21aa1dd42bfd76f560a.jpg', description: "Perfect for celebrations" },
  { id: 20, name: "Bollywood Slow Jams", image: 'https://i.pinimg.com/1200x/bc/6c/17/bc6c178559acc29947fa07d2ef9341f0.jpg', description: "Slow romantic tracks" },
  { id: 21, name: "Latest Love Hits", image: 'https://i.pinimg.com/736x/98/bb/ee/98bbee6e012d98f1418f895fe4f61b77.jpg', description: "Recent romantic releases" }
]

const currentPlaylists = playlistsData[category.value?.name] || playlistsData['Music'] || []

const handlePlaylistClick = (playlist) => {
  router.push(`/playlistview/${playlist.id}`)
}

const showAllSongs = () => {
  const hotHitsPlaylist = currentPlaylists.find(p => p.name === "Hot Hits Hindi") || currentPlaylists[0]
  if (hotHitsPlaylist) {
    handlePlaylistClick(hotHitsPlaylist)
  }
}
</script>

<template>
  <div
    class="p-5 overflow-y-auto"
  >
    <!-- Header -->
    <div class="mb-10 py-10">
      <h1
        class="text-white font-black leading-none m-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] text-[96px] md:text-[72px] sm:text-[48px] xs:text-[36px]"
      >
        {{ category.name }}
      </h1>
    </div>

    <!-- Popular Playlists -->
    <section class="mb-12">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-white sm:text-xl">Popular {{ category.name }} Playlists</h2>
        <button
          class="bg-none border-none text-gray-400 font-bold cursor-pointer py-2 text-xs uppercase tracking-wider hover:text-white transition"
          @click="showAllSongs"
        >
          Show all
        </button>
      </div>

      <div
        class="grid gap-6 xl:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-2"
      >
        <div
          v-for="playlist in currentPlaylists"
          :key="playlist.id"
          class=" rounded p-4 cursor-pointer transition-all duration-300 relative hover:bg-[hsl(0,0%,10%)]"
          @click="handlePlaylistClick(playlist)"
        >
          <div class="relative mb-4 rounded-lg overflow-hidden aspect-square">
            <img :src="playlist.image" :alt="playlist.name" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <div
                class="w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center text-black transform scale-90 transition-transform duration-200 shadow-lg group-hover:scale-100"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="text-white">
            <h3
              class="text-base font-bold mb-2 leading-snug line-clamp-2"
            >
              {{ playlist.name }}
            </h3>
            <p
              class="text-sm text-gray-400 leading-snug line-clamp-2"
            >
              {{ playlist.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- New & Trending -->
    <section class="mb-12">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-white sm:text-xl">New & Trending</h2>
        <button
          class="bg-none border-none text-gray-400 font-bold cursor-pointer py-2 text-xs uppercase tracking-wider hover:text-white transition"
        >
          Show all
        </button>
      </div>

      <div
        class="grid gap-6 xl:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-2"
      >
        <div
          v-for="playlist in newTrending"
          :key="playlist.id"
          class=" rounded p-4 cursor-pointer transition-all duration-300 relative hover:bg-[hsl(0,0%,10%)]"
          @click="handlePlaylistClick(playlist)"
        >
          <div class="relative mb-4 rounded-lg overflow-hidden aspect-square">
            <img :src="playlist.image" :alt="playlist.name" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <div
                class="w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center text-black transform scale-90 transition-transform duration-200 shadow-lg group-hover:scale-100"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="text-white">
            <h3 class="text-base font-bold mb-2 leading-snug line-clamp-2">{{ playlist.name }}</h3>
            <p class="text-sm text-gray-400 leading-snug line-clamp-2">{{ playlist.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bollywood Romance -->
    <section class="mb-12">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-white sm:text-xl">Bollywood Romance</h2>
        <button
          class="bg-none border-none text-gray-400 font-bold cursor-pointer py-2 text-xs uppercase tracking-wider hover:text-white transition"
        >
          Show all
        </button>
      </div>

      <div
        class="grid gap-6 xl:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-2"
      >
        <div
          v-for="playlist in bollywoodRomance"
          :key="playlist.id"
          class=" rounded p-4 cursor-pointer transition-all duration-300 relative hover:bg-[hsl(0,0%,10%)]"
          @click="handlePlaylistClick(playlist)"
        >
          <div class="relative mb-4 rounded-lg overflow-hidden aspect-square">
            <img :src="playlist.image" :alt="playlist.name" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <div
                class="w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center text-black transform scale-90 transition-transform duration-200 shadow-lg group-hover:scale-100"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="text-white">
            <h3 class="text-base font-bold mb-2 leading-snug line-clamp-2">{{ playlist.name }}</h3>
            <p class="text-sm text-gray-400 leading-snug line-clamp-2">{{ playlist.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
