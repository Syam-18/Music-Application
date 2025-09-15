<template>
  <div class="music-login-wrapper">
    <!-- Centered login card -->
    <div class="music-login-card">
      <!-- Logo -->
      <div class="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
          alt="logo"
        />
        <h2>Tunes</h2>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button :class="{ active: mode === 'login' }" @click="mode = 'login'">SIGN IN</button>
        <button :class="{ active: mode === 'signup' }" @click="mode = 'signup'">SIGN UP</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">
        <div v-if="mode === 'signup'" class="input-container">
          <input type="text" v-model="name" placeholder="Name" required autocomplete="new-name" />
        </div>
        <div class="input-container">
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            autocomplete="new-email"
          />
        </div>
        <div class="input-container">
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            autocomplete="new-password"
          />
        </div>

        <div class="options" v-if="mode === 'login'">
          <label> <input type="checkbox" v-model="rememberMe" /> stay signed in </label>
          <!-- <p v-if="mode==='login'" class="forgot">Forgot Password?</p> -->
        </div>
        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

        <button type="submit" class="btn-submit">
          {{ mode === 'login' ? 'SIGN IN' : 'SIGN UP' }}
        </button>
      </form>

      <!-- Google login -->
      <button class="btn-google" @click="handleGoogleLogin">
        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
        Login with Google
      </button>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'LoginPage' })
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const mode = ref('login')
const errorMessage = ref('') // 🔹 add error state

const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  errorMessage.value = '' // reset error before new attempt

  try {
    if (mode.value === 'login') {
      await authStore.login(email.value, password.value)
      router.replace('/home')
    } else {
      await authStore.signup(email.value, password.value, name.value)
      await authStore.login(email.value, password.value)
      router.replace('/home')
    }
  } catch (err) {
    // 🔹 Catch login/signup errors
    console.error('Auth error:', err)

    if (mode.value === 'login') {
      if (err.code === 'auth/user-not-found') {
        errorMessage.value = 'No account found with this email.'
      } else if (err.code === 'auth/wrong-password') {
        errorMessage.value = 'Incorrect password.'
      } else {
        errorMessage.value = 'Login failed. Please try again.'
      }
    } else {
      errorMessage.value = 'Signup failed. Please try again.'
    }
  }
}

const handleGoogleLogin = async () => {
  try {
    await authStore.loginWithGoogle()
    router.replace('/home')
  } catch (err) {
    if (err.code === 'auth/popup-closed-by-user') alert('Login popup closed by user.')
    else alert(err.message)
  }
}
</script>

<style scoped>
.music-login-wrapper {
  background-image: url('https://i.pinimg.com/736x/6f/34/35/6f3435e1b45e67d780360e9600ed98da.jpg');
  /* background-size: cover; */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}
.error-msg {
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: left;
}
/* Spotify-style card */
/* Spotify-style Glassmorphic card */
.music-login-card {
  background: rgba(34, 34, 34, 0.4); /* semi-transparent */
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 2rem;
  width: 400px;
  text-align: center;
  color: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: hidden;
}

/* Optional animated gradient border glow */
.music-login-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 18px;
  padding: 2px;
  background: linear-gradient(135deg, #1db954, #1ed760, #1db954);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: glowBorder 6s linear infinite;
  z-index: 0;
}

.music-login-card > * {
  position: relative;
  z-index: 1;
}

/* Glow border animation */
@keyframes glowBorder {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Logo */
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}
.logo img {
  width: 50px;
  margin-bottom: 0.5rem;
}
.logo h2 {
  font-size: 1.5rem;
  font-weight: 600;
}

/* Tabs */
.tabs {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}
.tabs button {
  background: none;
  border: none;
  color: #bbb;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid transparent;
  transition: 0.3s;
}
.tabs button.active {
  color: #1db954;
  border-bottom: 2px solid #1db954;
}

/* Inputs */
.input-container {
  margin-bottom: 1rem;
}
.input-container input {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 25px;
  border: none;
  outline: none;
  font-size: 0.95rem;
  background-color: #fff;
  color: #333;
}
.input-container input::placeholder {
  color: #aaa;
}

/* Options */
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #bbb;
  margin-bottom: 1rem;
}
.options input {
  margin-right: 0.4rem;
}

/* Buttons */
.btn-submit {
  background: #1db954;
  color: #fff;
  padding: 0.9rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
  margin-bottom: 1rem;
}
.btn-submit:hover {
  background: #1ed760;
}

.btn-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: #fff;
  color: #444;
  font-weight: 500;
  border-radius: 25px;
  padding: 0.8rem;
  width: 100%;
  cursor: pointer;
}
.btn-google img {
  width: 20px;
  height: 20px;
}
.btn-google:hover {
  background: #f2f2f2;
}

/* Forgot password */
.forgot {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #bbb;
  cursor: pointer;
}
.forgot:hover {
  text-decoration: underline;
}
</style>
