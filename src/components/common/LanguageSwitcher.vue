<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost m-1">
      {{ currentLanguageName }}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </label>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 text-primary rounded-box w-52">
      <li v-for="lang in availableLanguages" :key="lang.code">
        <a @click="setLanguage(lang.code)" :class="{ 'active': lang.code === currentLanguage }">
          {{ lang.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useTranslationStore} from '@/stores/translation'
import {i18n} from "@/main.js";

const translationStore = useTranslationStore()
const currentLanguage = ref(translationStore.getCurrentLanguage())

const availableLanguages = translationStore.availableLanguages
currentLanguage.value = translationStore.getCurrentLanguage()
translationStore.setLanguage(currentLanguage.value)
document.title = i18n.global.t('app.title')
const currentLanguageName = computed(() => {
  const lang = availableLanguages.find(l => l.code === currentLanguage.value)
  return lang ? lang.name : 'Language'
})

const setLanguage = (lang) => {
  currentLanguage.value = lang;
  translationStore.setLanguage(lang)
}
</script>
