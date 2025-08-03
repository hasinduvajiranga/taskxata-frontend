<template>
  <header class="bg-primary text-primary-content p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <img :src="logo" class="w-40" alt="Company Logo" />
      <div class="flex items-center space-x-4">
        <ThemeSwitcher />
        <LanguageSwitcher />
        <button v-if="isAuthenticated" @click="logout" class="btn btn-ghost">
          {{ $t('auth.logout') }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import logo from '@/assets/logo.png';
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = () => {
  authStore.logout()
}
</script>
