/// Construir una instancia de axios

import axios from 'axios';

// const URL_API = 'http://localhost:8000/api';
const URL_API = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: URL_API,
});

// Interceptor de peticiones para agregar el token de autenticación

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;