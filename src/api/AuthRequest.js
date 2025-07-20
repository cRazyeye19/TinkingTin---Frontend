import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
})

export const logIn = (formData) => API.post('/auth/login', formData)
export const signUp = (formData) => API.post('/auth/register', formData)
export const resetPass = (userData) => API.post('/forgot-password', userData)
export const forgotPass = (id, token, updatedPassword) => API.post(`/reset-password/${id}/${token}`, updatedPassword)