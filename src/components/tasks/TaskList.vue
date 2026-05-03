<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">{{ $t('tasks.my_tasks') }}</h2>
      <div class="flex items-center gap-4">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            {{ $t(`tasks.status.${currentFilter}`) }}
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a @click="changeFilter('all')">{{ $t('tasks.status.all') }}</a></li>
            <li><a @click="changeFilter('pending')">{{ $t('tasks.status.pending') }}</a></li>
            <li><a @click="changeFilter('completed')">{{ $t('tasks.status.completed') }}</a></li>
            <li><a @click="changeFilter('priority')">{{ $t('tasks.status.priority') }}</a></li>
          </ul>
        </div>
        <button @click="showCreateForm" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          {{ $t('tasks.create_task') }}
        </button>
      </div>
    </div>

    <TaskForm
        v-if="showForm"
        :task="selectedTask"
        :isLoading="isLoading"
        :error="error"
        @submit="handleSubmit"
        @cancel="hideForm"
    />

    <div v-if="isLoading && !showForm"
         class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div class="text-center">
        <span class="loading loading-dots loading-lg text-primary"></span>
        <p class="mt-4 text-white">Loading...</p>
      </div>
    </div>

    <div v-if="error && !showForm" class="alert alert-error alert-dash mb-6">
      <span>{{ error }}</span>
    </div>

    <div v-if="tasks.length === 0 && !isLoading && !showForm" class="text-center py-8">
      <p class="text-lg">{{ $t('tasks.no_tasks') }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @edit="editTask"
          @delete="deleteTask"
          @toggle-status="toggleTaskStatus"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import {useTaskStore} from '@/stores/task'
import TaskCard from './TaskCard.vue'
import TaskForm from './TaskForm.vue'
import {createToast} from 'mosha-vue-toastify'
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const taskStore = useTaskStore()

const showForm = ref(false)
const selectedTask = ref(null)
const isLoading = computed(() => taskStore.isLoading)
const error = ref(null)
const currentFilter = ref('all')
const tasks = computed(() => taskStore.filteredTasks)

onMounted(async () => {
  await fetchTasks()
})

const fetchTasks = async () => {
  error.value = null
  try {
    await taskStore.fetchTasks(currentFilter.value)
  } catch (err) {
    createToast(err || t('tasks.failed_to_fetched'), {
      showIcon: true,
      type: 'danger'
    })
  }
}

const changeFilter = (filter) => {
  currentFilter.value = filter
  fetchTasks()
}

const showCreateForm = () => {
  selectedTask.value = null
  showForm.value = true
}

const hideForm = () => {
  showForm.value = false
  selectedTask.value = null
}

const editTask = (task) => {
  selectedTask.value = task
  showForm.value = true
}

const handleSubmit = async (taskData) => {
  isLoading.value = true
  error.value = null
  try {
    if (selectedTask.value) {
      await taskStore.updateTask(selectedTask.value.id, taskData)
    } else {
      await taskStore.createTask(taskData)
    }
    hideForm()
    await fetchTasks()
    createToast(t('tasks.save_success'), {
      showIcon: true,
      type: 'success'
    })
  } catch (err) {
    createToast(err || t('tasks.failed_to_save'), {
      showIcon: true,
      type: 'danger'
    })
  } finally {
    isLoading.value = false
  }
}

const deleteTask = async (id) => {
  if (!confirm('Are you sure you want to delete this task?')) return

  isLoading.value = true
  error.value = null
  try {
    await taskStore.deleteTask(id)
    await fetchTasks()
    createToast(t('tasks.delete_success'), {
      showIcon: true,
      type: 'success'
    })
  } catch (err) {
    createToast(err || t('tasks.failed_to_delete'), {
      showIcon: true,
      type: 'danger'
    })
  } finally {
    isLoading.value = false
  }
}

const toggleTaskStatus = async (task) => {
  try {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed'
    await taskStore.updateTask(task.id, {status: newStatus})
    await fetchTasks()
    createToast(t('tasks.status_update_success'), {
      showIcon: true,
      type: 'success'
    })
  } catch (err) {
    createToast(err || t('tasks.failed_to_update'), {
      showIcon: true,
      type: 'danger'
    })
  }
}
</script>
