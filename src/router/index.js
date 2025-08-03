import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from '@/stores/auth'
import {useTranslationStore} from "@/stores/translation.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/AuthPage.vue'),
            meta: {requiresAuth: false, isLoginPage: true}
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/AuthPage.vue'),
            meta: {requiresAuth: false, isLoginPage: false}
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/pages/DashboardPage.vue'),
            meta: {requiresAuth: true}
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/pages/NotFoundPage.vue')
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    const translationStore = useTranslationStore()
    if (authStore.token) {
        await authStore.getAuth()
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/login')
    }

    if (to.meta.isLoginPage !== undefined && authStore.isAuthenticated) {
        translationStore.setLanguage(authStore.user.language)
        return next('/dashboard')
    }

    next()
})

export default router
