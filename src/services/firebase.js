// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyCtDAhGvWpl-SC4x7-4s1jYEdMgT5o8HzI",
authDomain: "music-app-a1327.firebaseapp.com",
projectId: "music-app-a1327",
storageBucket: "music-app-a1327.firebasestorage.app",
messagingSenderId: "113161978854",
appId: "1:113161978854:web:9dd8f2274bcdcf5d090c27",
measurementId: "G-HS91SDTCCE"};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
