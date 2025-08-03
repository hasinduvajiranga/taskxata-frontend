<template>
  <div class="card bg-base-100 shadow-xl w-full max-w-md">
    <div class="card-body mb-3">
      <h2 class="card-title">{{ $t('auth.register_title') }}</h2>
      <Form @submit="handleRegister" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('auth.name') }}</legend>
          <Field
              name="name"
              type="text"
              :placeholder="$t('auth.name_placeholder')"
              class="input w-full"
              :class="{ 'input-error': errors.name }"
          />
          <span v-if="errors.name" class="label-text-alt text-error -mt-2">{{ errors.name }}</span>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('auth.email') }}</legend>
          <Field
              name="email"
              type="email"
              :placeholder="$t('auth.email_placeholder')"
              class="input w-full"
              :class="{ 'input-error': errors.email }"
          />
          <span v-if="errors.email" class="label-text-alt text-error -mt-2">{{ errors.email }}</span>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('auth.password') }}</legend>
          <Field
              name="password"
              type="password"
              :placeholder="$t('auth.password_placeholder')"
              class="input w-full"
              :class="{ 'input-error': errors.password }"
          />
          <span v-if="errors.password" class="label-text-alt text-error -mt-2">{{ errors.password }}</span>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('auth.confirm_password') }}</legend>
          <Field
              name="password_confirmation"
              type="password"
              :placeholder="$t('auth.confirm_password_placeholder')"
              class="input w-full"
              :class="{ 'input-error': errors.password_confirmation }"
          />
          <span v-if="errors.password_confirmation" class="label-text-alt text-error -mt-2">{{
              errors.password_confirmation
            }}</span>
        </fieldset>

        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="loading loading-spinner"></span>
            {{ $t('auth.register_button') }}
          </button>
        </div>
      </Form>

      <div class="text-center mt-4">
        <router-link to="/login" class="link link-primary">
          {{ $t('auth.login_link') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Form, Field} from 'vee-validate'
import {object, string, ref} from 'yup'
import {useAuthStore} from '@/stores/auth'
import {useI18n} from 'vue-i18n'
import {createToast} from 'mosha-vue-toastify'

const {t} = useI18n()
const authStore = useAuthStore()

const schema = object({
  name: string().required(t('auth.validation.required', {field: t('auth.name')})),
  email: string()
      .required(t('auth.validation.required', {field: t('auth.email')}))
      .email(t('auth.validation.email')),
  password: string()
      .required(t('auth.validation.required', {field: t('auth.password')}))
      .min(8, t('auth.validation.min', {
        field: t('auth.password'),
        length: 8
      })),
  password_confirmation: string()
      .required(t('auth.validation.required', {field: t('auth.confirm_password')}))
      .oneOf([ref('password')], t('auth.validation.password_mismatch'))
})

const handleRegister = async (values, {setErrors}) => {
  try {
    await authStore.register({
      ...values,
      language: useI18n().locale.value
    })
    createToast(t('auth.register_success'), {
      showIcon: true,
      type: 'success'
    })
  } catch (error) {
    if (error.response?.status === 422) {
      const apiErrors = {}
      Object.entries(error.errors).forEach(([field, messages]) => {
        apiErrors[field] = messages.join(', ')
      })
      setErrors(apiErrors)
    } else {
      createToast(error || t('auth.register_error'), {
        showIcon: true,
        type: 'danger'
      })
    }
  }
}
</script>
