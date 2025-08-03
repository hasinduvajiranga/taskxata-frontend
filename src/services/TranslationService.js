import {i18n} from '@/main'
import {useAuthStore} from '@/stores/auth'

class TranslationService {
    setLanguage(lang) {
        const authStore = useAuthStore()
        i18n.global.locale.value = lang
    }

    getCurrentLanguage() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.language || i18n.global.locale.value
    }
}

export default new TranslationService()
