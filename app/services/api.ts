'use client'
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});
api.interceptors.request.use(
    (config) => {
        // Busca o cookie SEMPRE no momento da chamada
        const token = Cookies.get('token');

        if (token && token.trim() !== '') {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export default api;