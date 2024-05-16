import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000'
})

export const createNotif = (newNotification) => API.post('/notification', newNotification)
export const getNotifs = () => API.get('/notification/notifs')
export const deleteNotif = (id) => API.delete(`/notification/${id}`)
export const deleteAllNotifs = () => API.delete('/notification')