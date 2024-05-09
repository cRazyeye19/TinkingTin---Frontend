import axios from 'axios';

const API = axios.create({
    baseURL: "http://localhost:5000"
})

export const getAllTickets = () => API.get("/ticket/tickets")
export const createTicket = (data) => API.post("/ticket", data)
export const updateTicket = (id, updatedTicket) => API.put(`/ticket/${id}`, updatedTicket)
export const deleteTicket = (id) => API.delete(`/ticket/${id}`)