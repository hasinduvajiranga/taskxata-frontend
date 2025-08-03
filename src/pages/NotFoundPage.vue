<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">404</h1>
        <p class="py-6">{{ $t('not_found.message') }}</p>
        <router-link to="/dashboard" class="btn btn-primary">
          {{ $t('not_found.go_home') }}
        </router-link>
      </div>
    </div>
  </div>
</template>
