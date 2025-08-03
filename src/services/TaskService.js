import ApiService from './ApiService'

class TaskService {
    async getAllTasks(filter = 'all') {
        try {
            const params = filter !== 'all' ? {status: filter} : {}
            const response = await ApiService.get('/tasks', {params})
            return response.data.data || response.data
        } catch (error) {
            throw error.response?.data?.message || error.message
        }
    }

    async createTask(taskData) {
        try {
            const response = await ApiService.post('/tasks', taskData)
            return response.data
        } catch (error) {
            throw error.response?.data?.message || error.message
        }
    }

    async updateTask(id, taskData) {
        try {
            const response = await ApiService.put(`/tasks/${id}`, taskData)
            return response.data
        } catch (error) {
            throw error.response?.data?.message || error.message
        }
    }

    async deleteTask(id) {
        try {
            const response = await ApiService.delete(`/tasks/${id}`)
            return response.data
        } catch (error) {
            throw error.response?.data?.message || error.message
        }
    }

    async toggleTaskStatus(id, currentStatus) {
        try {
            const newStatus = currentStatus === 'completed' ? 'pending' : 'completed'
            const response = await ApiService.patch(`/tasks/${id}/complete`, {
                status: newStatus
            })
            return response.data
        } catch (error) {
            throw error.response?.data?.message || error.message
        }
    }
}

export default new TaskService()
