<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <svg width="132" height="40" viewBox="0 0 132 40" fill="currentColor">
          <path
            d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm9.167 28.85c-.367.6-1.15.8-1.75.433-4.8-2.933-10.833-3.6-17.933-1.967-.683.15-1.367-.25-1.517-.933-.15-.683.25-1.367.933-1.517 7.75-1.783 14.517-.983 19.817 2.267.6.35.8 1.15.45 1.717zm2.5-5.567c-.45.733-1.4.967-2.133.517-5.5-3.383-13.883-4.367-20.383-2.383-.817.25-1.683-.217-1.933-1.033-.25-.817.217-1.683 1.033-1.933 7.417-2.267 16.683-1.15 23.083 2.717.733.45.967 1.4.517 2.133l-.184-.018zm.217-5.8C25.05 13.567 14.567 13.217 8.467 15.05c-.95.283-1.95-.25-2.233-1.2-.283-.95.25-1.95 1.2-2.233 7.017-2.117 18.517-1.717 25.783 2.583.883.517 1.167 1.65.65 2.533-.517.883-1.65 1.167-2.533.65l.05-.1z" />
        </svg>
      </div>

      <h1>Log in to Spotify</h1>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email or username</label>
          <input id="email" v-model="email" type="text" placeholder="Email or username" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" placeholder="Password" required />
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            <span class="checkmark"></span>
            Remember me
          </label>
          <a href="#" class="forgot-password">Forgot your password?</a>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Log In' }}
        </button>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>

      <div class="divider">
        <span>or</span>
      </div>

      <div class="social-login">
        <button class="social-btn google-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" />
            <path
              d="M10 20c2.7 0 4.96-.89 6.62-2.41l-3.16-2.45c-.9.61-2.07.98-3.46.98-2.67 0-4.92-1.8-5.73-4.22H1.07v2.52C2.72 17.75 6.09 20 10 20z" />
            <path
              d="M4.27 11.9c-.25-.61-.39-1.25-.39-1.9s.14-1.29.39-1.9V5.58H1.07C.39 6.93 0 8.41 0 10s.39 3.07 1.07 4.42L4.27 11.9z" />
            <path
              d="M10 3.98c1.51 0 2.55.65 3.14 1.19l2.28-2.28C13.96.89 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.58l3.2 2.52C5.08 5.78 7.33 3.98 10 3.98z" />
          </svg>
          Continue with Google
        </button>

        <button class="social-btn facebook-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
          </svg>
          Continue with Facebook
        </button>

        <button class="social-btn apple-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M15.5 8.5c0-2.5 2-4.5 4.5-4.5-.5-3-3.5-5.5-7-5.5-3 0-5.5 2-6.5 2s-3.5-2-6-2C-2.5 0-5 3.5-5 8c0 5 4 12 7.5 12 1.5 0 2.5-1 4-1s2.5 1 4 1c3.5 0 7.5-7 7.5-12z" />
            <path d="M12.5 4c1.5-2 4-3.5 4-3.5s-.5-3.5-3.5-3.5c-2 0-3.5 1.5-4 3.5-.5 2 .5 3.5 3.5 3.5z" />
          </svg>
          Continue with Apple
        </button>
      </div>

      <div class="signup-link">
        <span>Don't have an account?</span>
        <a href="#">Sign up for Spotify</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/stores'

const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock login validation
    if (email.value && password.value) {
      const user = {
        id: 1,
        name: email.value.split('@')[0] || email.value,
        email: email.value,
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2'
      }

      store.login(user)
      router.push('/')
    } else {
      error.value = 'Please enter your email and password'
    }
  } catch (err) {
    error.value = 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1db954 0%, #191414 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  background: #000;
  border-radius: 8px;
  padding: 48px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
  color: #fff;
}

h1 {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
  line-height: 1.2;
}

.login-form {
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #727272;
  border-radius: 4px;
  background: #121212;
  color: #fff;
  font-size: 16px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #1db954;
}

.form-group input::placeholder {
  color: #b3b3b3;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.remember-me {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.remember-me input {
  display: none;
}

.checkmark {
  width: 16px;
  height: 16px;
  border: 1px solid #727272;
  border-radius: 2px;
  margin-right: 8px;
  position: relative;
  transition: all 0.2s;
}

.remember-me input:checked+.checkmark {
  background: #1db954;
  border-color: #1db954;
}

.remember-me input:checked+.checkmark::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid #000;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-password {
  color: #fff;
  font-size: 14px;
  text-decoration: underline;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #1db954;
}

.login-btn {
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 50px;
  background: #1db954;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.login-btn:hover:not(:disabled) {
  transform: scale(1.04);
  background: #1ed760;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #e22134;
  font-size: 14px;
  text-align: center;
  margin-top: 16px;
  padding: 12px;
  background: rgba(226, 33, 52, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(226, 33, 52, 0.3);
}

.divider {
  text-align: center;
  margin: 32px 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #727272;
}

.divider span {
  background: #000;
  color: #b3b3b3;
  padding: 0 16px;
  font-size: 14px;
  position: relative;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 16px;
  border: 1px solid #727272;
  border-radius: 50px;
  background: none;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.social-btn:hover {
  border-color: #fff;
  transform: scale(1.02);
}

.signup-link {
  text-align: center;
  color: #b3b3b3;
  font-size: 16px;
}

.signup-link a {
  color: #fff;
  text-decoration: underline;
  margin-left: 8px;
  transition: color 0.2s;
}

.signup-link a:hover {
  color: #1db954;
}

@media (max-width: 768px) {
  .login-card {
    padding: 24px;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 32px;
  }

  .form-options {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}
</style>
