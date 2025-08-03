<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-4">
    <component :is="currentComponent"/>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const route = useRoute()

const currentComponent = computed(() => {
  return route.name === 'login' ? LoginForm : RegisterForm
})
</script>
