<template>
  <div class="music-login-wrapper">
    <!-- Floating music notes -->
    <div class="music-note" v-for="n in 10" :key="n" :style="{ left: Math.random() * 100 + '%' }">🎵</div>

    <!-- Equalizer bars -->
    <div class="equalizer">
      <div class="bar" v-for="n in 5" :key="n"></div>
    </div>

    <!-- Login/Signup Card -->
    <div class="music-login-card">
      <h2 class="title">🎵 Welcome to Soundify</h2>
      <p class="subtitle">Login or Sign up to enjoy your music</p>

      <!-- Tabs -->
      <div class="tabs">
        <button :class="{ active: mode==='login' }" @click="mode='login'">Login</button>
        <button :class="{ active: mode==='signup' }" @click="mode='signup'">Sign Up</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">
        <div class="input-container" :class="{ filled: email }">
          <input type="email" v-model="email" autocomplete="off" required />
          <label>Email</label>
        </div>

        <div class="input-container" :class="{ filled: password }">
          <input type="password" v-model="password" autocomplete="new-password" required />
          <label>Password</label>
        </div>

        <div class="options" v-if="mode==='login'">
          <label class="remember">
            <input type="checkbox" v-model="rememberMe" /> Remember me
          </label>
        </div>

        <button type="submit" class="btn-primary" :disabled="authStore.loading">
          {{ authStore.loading ? (mode==='login' ? 'Logging in...' : 'Signing up...') : (mode==='login' ? 'Login' : 'Sign Up') }}
        </button>

        <p v-if="authStore.error" class="error">⚠ {{ authStore.error.message }}</p>
      </form>

      <!-- Google Login -->
      <button class="btn-google" @click="handleGoogleLogin" :disabled="authStore.loading">
        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
        {{ authStore.loading ? "Processing..." : "Login with Google" }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "LoginPage" });
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const mode = ref("login"); // 'login' or 'signup'

const router = useRouter();
const authStore = useAuthStore();

// Auto redirect if user is already logged in
watch(
  () => authStore.user,
  (user) => {
    if (user) router.replace("/home");
  },
  { immediate: true }
);

// Handle login/signup form
const handleSubmit = async () => {
  if (mode.value === "login") {
    try {
      await authStore.login(email.value, password.value);
      router.replace("/home");
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      await authStore.signup(email.value, password.value);
      await authStore.login(email.value, password.value);
      router.replace("/home");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already registered. Please login.");
        mode.value = "login";
      } else {
        alert(err.message);
      }
    }
  }
};

// Google login
const handleGoogleLogin = async () => {
  try {
    await authStore.loginWithGoogle();
    router.replace("/home");
  } catch (err) {
    if (err.code === "auth/popup-closed-by-user") alert("Login popup closed by user.");
    else alert(err.message);
  }
};
</script>

<style scoped>
/* Keep all your previous styles */
.music-login-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-45deg, #1e1e2f, #4a148c, #1e88e5, #00e676);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}

.music-note {
  position: absolute;
  bottom: -2rem;
  font-size: 1.5rem;
  animation: rise 5s linear infinite;
  opacity: 0.7;
}
@keyframes rise { 0% { transform: translateY(0) rotate(0deg); opacity: 0.7; } 50% { opacity: 1; } 100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; } }

.equalizer { position: absolute; bottom: 2rem; display: flex; gap: 4px; }
.bar { width: 6px; height: 20px; background: #ff4081; animation: equalize 0.5s infinite alternate; }
.bar:nth-child(2) { animation-delay: 0.1s; }
.bar:nth-child(3) { animation-delay: 0.2s; }
.bar:nth-child(4) { animation-delay: 0.3s; }
.bar:nth-child(5) { animation-delay: 0.4s; }
@keyframes equalize { from { transform: scaleY(0.5); } to { transform: scaleY(1.5); } }

.music-login-card { position: relative; z-index: 10; background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); padding: 2.5rem 2rem; border-radius: 20px; width: 450px; color: #fff; box-shadow: 0 15px 30px rgba(0,0,0,0.5); text-align: center; }

.title { font-size: 2rem; font-weight: 600; margin-bottom: 0.3rem; }
.subtitle { font-size: 0.95rem; color: #ddd; margin-bottom: 1.8rem; }

.tabs { display: flex; justify-content: center; gap: 1rem; margin-bottom: 1.5rem; }
.tabs button { padding: 0.5rem 1rem; border-radius: 20px; border: none; cursor: pointer; background: #1e1e1e; color: #bbb; transition: all 0.3s; }
.tabs button.active { background: #ff4081; color: #fff; }

.input-container { position: relative; margin-bottom: 1.5rem; }
.input-container input { width: 100%; padding: 0.8rem 1rem; border-radius: 12px; border: none; outline: none; background: rgba(255,255,255,0.1); color: #fff; }
.input-container label { position: absolute; top: 50%; left: 1rem; transform: translateY(-50%); color: #bbb; font-size: 0.9rem; pointer-events: none; transition: 0.3s; }
.input-container.filled label, .input-container input:focus + label { top: -10px; left: 0.9rem; font-size: 0.75rem; color: #ff4081; background: rgba(0,0,0,0.6); padding: 0 0.25rem; }

.options { text-align: left; margin-bottom: 1.5rem; }
.remember { font-size: 0.85rem; color: #fff; }
.remember input { margin-right: 0.5rem; }

button { width: 100%; padding: 0.75rem; border: none; border-radius: 12px; font-weight: 500; cursor: pointer; margin-bottom: 0.8rem; transition: all 0.3s; }
.btn-primary { background: #ff4081; color: #fff; }
.btn-primary:hover { background: #e73370; }
.btn-secondary { background: #1e88e5; color: #fff; }
.btn-secondary:hover { background: #1664b3; }
.btn-google { display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: #fff; color: #555; }
.btn-google img { width: 20px; height: 20px; }
.btn-google:hover { background: #f7f7f7; }

.error { color: #f44336; margin-top: 0.5rem; font-size: 0.9rem; }

@keyframes gradientBG { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
</style>
