import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Library from '../views/Library.vue'
import LikedSongs from '../views/LikedSongs.vue'
import Album from '../views/Album.vue'
import Artist from '../views/Artist.vue'
import Playlist from '../views/Playlist.vue'
import Login from '../views/Login.vue'

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
    path: '/library',
    name: 'Library',
    component: Library,
  },
  {
    path: '/liked-songs',
    name: 'LikedSongs',
    component: LikedSongs,
  },
  {
    path: '/album/:id',
    name: 'Album',
    component: Album,
  },
  {
    path: '/artist/:id',
    name: 'Artist',
    component: Artist,
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
=======

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [],
>>>>>>> f04999ac88457181540a72bfe2d07f0caab1b97b
})

export default router
