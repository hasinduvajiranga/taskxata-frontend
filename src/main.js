import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createI18n} from 'vue-i18n'
import App from './App.vue'
import router from './router'
import './style.css'

import enMessages from './assets/locales/en.json'
import siMessages from './assets/locales/si.json'
import jaMessages from './assets/locales/ja.json'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'


export const i18n = createI18n({
    legacy: false,
    locale: 'en', // default locale
    fallbackLocale: 'en',
    messages: {
        en: enMessages,
        si: siMessages,
        ja: jaMessages
    }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(moshaToast)
app.mount('#app')
