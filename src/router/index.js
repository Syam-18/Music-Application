import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStore } from "@/stores/auth"; // ✅ make sure this exists

// Views
import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue";
import LikedSongs from "@/views/LikedSongs.vue";
import Login from "@/views/Login.vue";
import Playlist from "@/views/Albums.vue";

// Components
import TrackView from "@/components/TrackView.vue";
import ArtistView from "@/components/ArtistView.vue";
import SearchResults from "@/components/SearchResults.vue";
import LibraryMobile from "@/components/LibraryMobile.vue";
import Albums from "@/views/Albums.vue";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: { requiresAuth: true },
  },
  {
    path: '/search/:id',
    name: 'SearchResults',
    component: SearchResults,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/liked-songs',
    name: 'LikedSongs',
    component: LikedSongs,
    meta: { requiresAuth: true },
  },
  {
    path: '/playlist/:id',
    name: 'Playlist',
    component: Playlist,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/track/:id',
    name: 'TrackView',
    component: TrackView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/artist/:id',
    name: 'ArtistView',
    component: ArtistView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/album/:id',
    name: 'AlbumView',
    component: () => import('@/components/AlbumView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/library',
    name: 'Library',
    component:LibraryMobile,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/NotFound.vue'),
  },
  {
    path: '/saved-albums',
    name: 'Saved Albums',
    component: Albums,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// // ✅ Auth Guard
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();

//   if (to.meta.requiresAuth && !authStore.user) {
//     next("/login"); // redirect to login if not logged in
//   } else {
//     next();
//   }
// });

router.afterEach(() => {
  const container = document.getElementById('main-scroll')
  if (container) {
    container.scrollTo({ top: 0, behavior: 'smooth' }) // smooth scroll like Spotify
  }
})

export default router;
