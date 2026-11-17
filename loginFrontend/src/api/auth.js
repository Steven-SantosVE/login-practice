import api from '../api/AxiosConfig'

async function checkAuth() {
    try {
        const response = await api.get('api/users/me');
        return response.data.authenticated;
    } catch (error) {
        console.log('Authentication failed:', error.response?.data);
        return false;
    }
}

export default checkAuth