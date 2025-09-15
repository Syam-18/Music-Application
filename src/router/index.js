import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import LikedSongs from '../views/LikedSongs.vue'
// import Artist from '../views/Artist.vue'
import Playlist from '../views/Playlist.vue'
import Login from '../views/Login.vue'
// import { useAuthStore } from '@/stores/auth'
import TrackView from '@/components/TrackView.vue'
import ArtistView from '@/components/ArtistView.vue'
import SearchResults from '@/components/SearchResults.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/search/:id',
    name: 'SearchResults',
    component: SearchResults,
  },
  {
    path: '/liked-songs',
    name: 'LikedSongs',
    component: LikedSongs,
  },
  {
    path: '/playlist/:id',
    name: 'Playlist',
    component: Playlist,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/track/:id',
    name: 'TrackView',
    component: TrackView,
  },
  {
    path: '/artist/:id',
    name: 'ArtistView',
    component: ArtistView,
  },
  {
    path: '/album/:id',
    name: 'AlbumView',
    component: () => import('@/components/AlbumView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   if (to.path === '/' && !authStore.user) next('/')
//   else if (to.path === '/' && authStore.user) next('/')
//   else next()
// })

export default router
