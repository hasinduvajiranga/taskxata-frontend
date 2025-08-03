<template>
  <div class="card bg-base-100 shadow-xl w-full max-w-md">
    <div class="card-body">
      <h2 class="card-title mb-3">{{ $t('auth.login_title') }}</h2>
      <Form @submit="handleLogin" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('auth.email') }}</legend>
          <Field
              name="email"
              type="text"
              class="input w-full"
              :class="{ 'input-error': errors.email }"
              :placeholder="$t('auth.email_placeholder')"
          />
          <span v-if="errors.email" class="label-text-alt text-error -mt-2">{{ errors.email }}</span>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('auth.password') }}</legend>
          <Field
              name="password"
              type="password"
              class="input w-full"
              :class="{ 'input-error': errors.password }"
              :placeholder="$t('auth.password_placeholder')"
          />
          <span v-if="errors.password" class="label-text-alt text-error -mt-2">{{ errors.password }}</span>
        </fieldset>
        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="loading loading-spinner"></span>
            {{ $t('auth.login_button') }}
          </button>
        </div>
      </Form>
      <div class="text-center mt-4">
        <router-link to="/register" class="link link-primary">
          {{ $t('auth.register_link') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Form, Field} from 'vee-validate'
import {object, string} from 'yup'
import {useAuthStore} from '@/stores/auth'
import {useI18n} from 'vue-i18n'
import {createToast} from 'mosha-vue-toastify'

const {t} = useI18n()
const authStore = useAuthStore()
const schema = object({
  email: string()
      .required(t('auth.validation.required', {field: t('auth.email')}))
      .email(t('auth.validation.email')),
  password: string()
      .required(t('auth.validation.required', {field: t('auth.password')}))
      .min(6, t('auth.validation.min', {
        field: t('auth.password'),
        length: 6
      }))
})

const handleLogin = async (values, {setErrors}) => {
  try {
    await authStore.login(values)
  } catch (error) {
    if (error.response?.status === 422) {
      const apiErrors = {}
      Object.entries(error.response.data.errors).forEach(([field, messages]) => {
        apiErrors[field] = messages.join(', ')
      })
      setErrors(apiErrors)
    } else {
      createToast(
          error || t('auth.login_error'),
          {showIcon: true, type: 'danger'}
      )
    }
  }
}
</script>
