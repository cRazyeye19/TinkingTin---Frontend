import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000"
})

export const getAllUsers = () => API.get('/user/users')
export const getUser = (userId) => API.get(`/user/${userId}`)   
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData)
export const updateAssignee = (id, updatedUser) => API.put(`/user/assign/${id}`, updatedUser)