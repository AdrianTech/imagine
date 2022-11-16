import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import VueEasyLightbox from 'vue-easy-lightbox'

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(VueEasyLightbox).mount('#app')
