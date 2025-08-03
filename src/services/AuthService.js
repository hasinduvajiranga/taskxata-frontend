import ApiService from './ApiService'

class AuthService {
    async login(credentials) {
        try {
            const response = await ApiService.post('/login', credentials)
            return response.data
        } catch (error) {
            throw error.response?.data?.message || error.message
        }
    }

    async register(userData) {
        try {
            const response = await ApiService.post('/register', userData)
            return response.data
        } catch (error) {
            throw error.response?.data?.message || error.message
        }
    }
}

export default new AuthService()
