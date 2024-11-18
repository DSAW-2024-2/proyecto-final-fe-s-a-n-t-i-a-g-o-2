// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proyecto-final-be-s-a-n-t-i-a-g-o-2.vercel.app', 
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.token) {
      config.headers.Authorization = `Bearer ${storedUser.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
