import {defineStore} from 'pinia'
import TranslationService from '@/services/TranslationService'

export const useTranslationStore = defineStore('translation', {
    state: () => ({
        availableLanguages: [
            {code: 'en', name: 'English'},
            {code: 'si', name: 'සිංහල'},
            {code: 'ja', name: '日本語'}
        ]
    }),
    actions: {
        setLanguage(lang) {
            TranslationService.setLanguage(lang)
        },
        getCurrentLanguage() {
            return TranslationService.getCurrentLanguage()
        }
    }
})
