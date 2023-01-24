import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import VueEasyLightbox from 'vue-easy-lightbox'
import { plugin, defaultConfig } from '@formkit/vue'
import { pl, en } from '@formkit/i18n'
import * as ConfirmDialog from 'vuejs-confirm-dialog'

const pinia = createPinia()
const app = createApp(App);

app.use(pinia).use(router).use(ConfirmDialog).use(VueEasyLightbox).use(plugin, defaultConfig({
    locales: { pl, en }, locale: 'pl', theme: 'genesis'
})).mount('#app');

app.config.globalProperties.$log = console.log;
