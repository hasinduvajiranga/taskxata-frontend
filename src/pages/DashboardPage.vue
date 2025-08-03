<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">{{ $t('dashboard.title') }}</h1>
      <div class="text-sm">
        {{ $t('dashboard.welcome') }}, <span class="font-semibold">{{ user.name }}</span>!
      </div>
    </div>

    <TaskList/>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useAuthStore} from '@/stores/auth'
import TaskList from '@/components/tasks/TaskList.vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>
