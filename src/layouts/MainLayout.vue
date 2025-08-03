<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader/>
    <div class="flex flex-1">
      <main class="flex-1 p-6 bg-base-200">
        <slot/>
      </main>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
</script>
