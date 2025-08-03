<template>
  <div class="card bg-base-100 shadow-xl mb-6">
    <div class="card-body">
      <h3 class="card-title">
        {{ task ? $t('tasks.edit_task') : $t('tasks.create_task') }}
      </h3>

      <Form @submit="$emit('submit', form)" :validation-schema="schema" v-slot="{ errors }">
        <fieldset class="fieldset mb-4">
          <legend class="fieldset-legend">{{ $t('tasks.title') }}</legend>
          <Field
              name="title"
              v-model="form.title"
              :placeholder="$t('tasks.title_placeholder')"
              class="input w-full"
              :class="{ 'input-error': errors.title }"
          />
          <span v-if="errors.title" class="label-text-alt text-error">{{ errors.title }}</span>
        </fieldset>
        <fieldset class="fieldset mb-4">
          <legend class="fieldset-legend">{{ $t('tasks.description') }}</legend>
          <Field
              name="description"
              as="textarea"
              v-model="form.description"
              :placeholder="$t('tasks.description_placeholder')"
              class="textarea w-full h-24"
              :class="{ 'textarea-error': errors.description }"
          />
          <span v-if="errors.description" class="label-text-alt text-error">{{ errors.description }}</span>
        </fieldset>
        <fieldset v-if="task" class="fieldset mb-4">
          <legend class="fieldset-legend">{{ $t('tasks.status_field') }}</legend>
          <label class="label cursor-pointer justify-start gap-4">
            <Field
                name="status"
                type="checkbox"
                v-model="form.status"
                true-value="completed"
                false-value="pending"
                class="toggle toggle-success"
            />
            <span class="label-text">
              {{ form.status === 'completed' ? $t('tasks.status.completed') : $t('tasks.status.pending') }}
            </span>
          </label>
        </fieldset>
        <div class="card-actions justify-end mt-6">
          <button
              type="button"
              @click="$emit('cancel')"
              class="btn btn-ghost"
              :disabled="isLoading"
          >
            {{ $t('common.cancel') }}
          </button>
          <button
              type="submit"
              class="btn btn-primary"
              :disabled="isLoading"
          >
            <span v-if="isLoading" class="loading loading-spinner"></span>
            {{ task ? $t('common.update') : $t('common.create') }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import {Form, Field} from 'vee-validate'
import {object, string} from 'yup'
import {reactive, watch} from 'vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const props = defineProps({
  task: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  title: '',
  description: '',
  status: 'pending'
})

const schema = object({
  title: string()
      .required(t('tasks.validation.title_required'))
      .max(100, t('tasks.validation.title_max_length')),
  description: string()
      .max(500, t('tasks.validation.description_max_length')),
  status: string()
      .oneOf(['pending', 'completed'], t('tasks.validation.invalid_status'))
})

const resetForm = () => {
  form.title = ''
  form.description = ''
  form.status = 'pending'
}

watch(() => props.task, (newTask) => {
  if (newTask) {
    form.title = newTask.title
    form.description = newTask.description
    form.status = newTask.status
  } else {
    resetForm()
  }
}, {immediate: true})
</script>
