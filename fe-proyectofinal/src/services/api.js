// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajusta esta URL según tu configuración
});

// Interceptor para añadir el token de autorización a cada solicitud
api.interceptors.request.use(
  (config) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.token) {
      config.headers.Authorization = `Bearer ${storedUser.token}`;
    } else {
      // Si no hay token, eliminar el header de autorización
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
