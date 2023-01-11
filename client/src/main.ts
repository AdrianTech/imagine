import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import VueEasyLightbox from 'vue-easy-lightbox'
import { plugin, defaultConfig } from '@formkit/vue'
import { pl, en } from '@formkit/i18n'

const pinia = createPinia()


createApp(App).use(pinia).use(router).use(VueEasyLightbox).use(plugin, defaultConfig({
    locales: { pl, en }, locale: 'pl', theme: 'genesis'
})).mount('#app')
