import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
})

export const createComment = (newComment) => API.post('/comment', newComment)
export const getAllComments = () => API.get('/comment/comments')
export const updateComment = (id, newUpdatedComment) => API.put(`/comment/${id}`, newUpdatedComment)
export const deleteComment = (id) => API.delete(`/comment/${id}`)
export const addReply = (id, newReply) => API.put(`/comment/${id}/reply`, newReply)
export const getAllReplies = (id) => API.get(`/comment/${id}/replies`)
export const editReply = (id, replyId, updatedReply) => API.put(`/comment/${id}/${replyId}`, updatedReply)
export const deleteReply = (id, replyId) => API.delete(`/comment/${id}/${replyId}`)