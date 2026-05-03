import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createI18n} from 'vue-i18n'
import App from './App.vue'
import router from './router'
import './style.css'

import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

// Lazy load locale messages for better initial bundle size
const loadLocaleMessages = async (locale) => {
    const messages = {
        en: () => import('./assets/locales/en.json'),
        si: () => import('./assets/locales/si.json'),
        ja: () => import('./assets/locales/ja.json')
    }
    return (await messages[locale]()).default
}

export const i18n = createI18n({
    legacy: false,
    locale: 'en', // default locale
    fallbackLocale: 'en',
    messages: {
        en: await loadLocaleMessages('en'),
        si: await loadLocaleMessages('si'),
        ja: await loadLocaleMessages('ja')
    }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(moshaToast)
app.mount('#app')
