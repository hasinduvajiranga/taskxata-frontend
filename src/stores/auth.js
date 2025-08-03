import {defineStore} from 'pinia'
import AuthService from '@/services/AuthService'
import TranslationService from '@/services/TranslationService'
import {parseJwt} from '@/utils/jwt'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isLoading: false,
        error: null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        userLanguage: (state) => state.user?.language || 'en'
    },
    actions: {
        async login(credentials) {
            this.isLoading = true
            this.error = null
            try {
                const {token} = await AuthService.login(credentials)
                const decoded = parseJwt(token)
                if (!decoded) throw new Error('Invalid token')
                const user = {
                    id: decoded.sub,
                    name: decoded.name,
                    email: decoded.email,
                    language: decoded.language || 'en'
                }

                this.user = user
                this.token = token
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', token)
                TranslationService.setLanguage(user.language)

                router.push('/dashboard')
            } catch (error) {
                this.error = error
                throw error
            } finally {
                this.isLoading = false
            }
        },
        async register(userData) {
            this.isLoading = true
            this.error = null
            try {
                await AuthService.register(userData)
                router.push('/login')
            } catch (error) {
                this.error = error
                throw error
            } finally {
                this.isLoading = false
            }
        },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            router.push('/login')
        },
        getAuth() {
            if (this.user && this.token) {
                return {user: this.user, token: this.token}
            }
            const user = JSON.parse(localStorage.getItem('user'))
            const token = localStorage.getItem('token')

            if (user && token) {
                this.user = user
                this.token = token
                return {user, token}
            }

            return null
        }
    }
})
