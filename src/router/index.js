import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStore } from "@/stores/auth"; // ✅ make sure this exists

// Views
import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue";
import LikedSongs from "@/views/LikedSongs.vue";
import Login from "@/views/Login.vue";
import Playlist from "@/views/Playlist.vue";

// Components
import TrackView from "@/components/TrackView.vue";
import ArtistView from "@/components/ArtistView.vue";
import SearchResults from "@/components/SearchResults.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: { requiresAuth: true },
  },
  {
    path: "/search/:id",
    name: "SearchResults",
    component: SearchResults,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/liked-songs",
    name: "LikedSongs",
    component: LikedSongs,
    meta: { requiresAuth: true },
  },
  {
    path: "/playlist/:id",
    name: "Playlist",
    component: Playlist,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/track/:id",
    name: "TrackView",
    component: TrackView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/artist/:id",
    name: "ArtistView",
    component: ArtistView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/album/:id",
    name: "AlbumView",
    component: () => import("@/components/AlbumView.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

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

export default router;
