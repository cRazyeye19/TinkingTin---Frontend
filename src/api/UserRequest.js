import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const getAllUsers = () => API.get('/user/users')
export const getUser = (userId) => API.get(`/user/${userId}`)
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData)
export const updateAssignee = (id, updatedUser) => API.put(`/user/assign/${id}`, updatedUser)