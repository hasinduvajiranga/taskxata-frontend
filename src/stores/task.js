import {defineStore} from 'pinia'
import TaskService from '@/services/TaskService'

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [],
        isLoading: false,
        error: null,
        currentFilter: 'all'
    }),

    actions: {
        async fetchTasks(filter = null) {
            this.isLoading = true
            this.error = null

            if (filter) {
                this.currentFilter = filter
            }

            try {
                const response = await TaskService.getAllTasks(this.currentFilter)
                this.tasks = response.data || response
            } catch (error) {
                this.error = error.message || 'Failed to fetch tasks'
                throw error
            } finally {
                this.isLoading = false
            }
        },

        async createTask(taskData) {
            this.isLoading = true
            this.error = null

            try {
                const newTask = await TaskService.createTask(taskData)
                this.tasks.unshift(newTask)
                return newTask
            } catch (error) {
                this.error = error
                throw error
            } finally {
                this.isLoading = false
            }
        },

        async updateTask(id, taskData) {
            this.isLoading = true
            this.error = null

            try {
                const updatedTask = await TaskService.updateTask(id, taskData)
                const index = this.tasks.findIndex(task => task.id === id)
                if (index !== -1) {
                    this.tasks.splice(index, 1, updatedTask)
                }
                return updatedTask
            } catch (error) {
                this.error = error
                throw error
            } finally {
                this.isLoading = false
            }
        },

        async deleteTask(id) {
            this.isLoading = true
            this.error = null

            try {
                await TaskService.deleteTask(id)
                this.tasks = this.tasks.filter(task => task.id !== id)
                return true
            } catch (error) {
                this.error = error
                throw error
            } finally {
                this.isLoading = false
            }
        },

        async toggleTaskStatus(task) {
            try {
                const updatedTask = await TaskService.toggleTaskStatus(
                    task.id,
                    task.status
                )
                const index = this.tasks.findIndex(t => t.id === task.id)
                if (index !== -1) {
                    this.tasks.splice(index, 1, updatedTask)
                }
                return updatedTask
            } catch (error) {
                this.error = error
                throw error
            }
        },

        setFilter(filter) {
            if (['all', 'pending', 'completed'].includes(filter)) {
                this.currentFilter = filter
            }
        },

        clearError() {
            this.error = null
        }
    }
})
