<template>
  <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
    <div class="card-body">
      <div class="flex justify-between items-start gap-2">
        <h3 class="card-title break-words">{{ task.title }}</h3>
        <div class="flex items-center gap-2">
          <button
              @click.stop="toggleStatus"
              class="btn btn-sm btn-ghost p-1"
              :title="$t(`tasks.mark_as_${task.status === 'completed' ? 'pending' : 'completed'}`)"
          >
            <span
                class="badge badge-lg cursor-pointer"
                :class="statusBadgeClass"
            >
              {{ $t(`tasks.status.${task.status}`) }}
            </span>
          </button>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-sm btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
              </svg>
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10">
              <li>
                <a @click="$emit('edit', task)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  {{ $t('tasks.edit') }}
                </a>
              </li>
              <li>
                <a @click="$emit('delete', task.id)" class="text-error">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  {{ $t('tasks.delete') }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p class="break-words mt-2 text-gray-600 dark:text-gray-300" v-if="task.description">
        {{ task.description }}
      </p>

      <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {{ formatDate(task.created_at) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete', 'toggle-status'])

const statusBadgeClass = computed(() => ({
  'badge-success': props.task.status === 'completed',
  'badge-warning': props.task.status === 'pending',
  'hover:badge-outline': true
}))

const toggleStatus = () => {
  emit('toggle-status', props.task)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
