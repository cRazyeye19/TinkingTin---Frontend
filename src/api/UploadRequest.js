import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});

export const uploadImage = (data) => API.post("/upload/", data);
export const uploadPost = (data) => API.post("/posts", data);