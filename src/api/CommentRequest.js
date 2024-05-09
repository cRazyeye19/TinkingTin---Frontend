import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000'
})

export const createComment = (newComment) => API.post('/comment', newComment)
export const getAllComments = () => API.get('/comment/comments')
export const addReply = (id, newReply) => API.put(`/comment/${id}/reply`, newReply)
export const updateComment = (id, updatedComment) => API.put(`/comment/${id}`, updatedComment)