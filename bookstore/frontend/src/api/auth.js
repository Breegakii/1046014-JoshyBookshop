import apiClient from "./client";

const login = async(formData={}) => await apiClient.post('/auth/jwt/create/', formData)
const register = async(registerData={}) => await apiClient.post('/auth/users/', registerData)

export default {
    login,
    register
}