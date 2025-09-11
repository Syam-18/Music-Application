<<<<<<< HEAD
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
=======
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
>>>>>>> f04999ac88457181540a72bfe2d07f0caab1b97b

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
