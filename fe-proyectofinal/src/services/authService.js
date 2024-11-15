import axios from 'axios';

const API_URL = 'https://proyecto-final-be-s-a-n-t-i-a-g-o-2.vercel.app';

// Configuración global de Axios para establecer la URL base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Registro de usuario
const register = async (userData) => {
  try {
    console.log("Datos enviados al backend:", userData); // Depuración de datos enviados al backend
    const response = await api.post('/users/register', userData);
    const user = response.data.user;
    
    // Guardar el token si está presente en la respuesta
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return user;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

// Inicio de sesión
const login = async (email, password) => {
  try {
    const response = await api.post('/users/login', { correo: email, contraseña: password });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw error;
  }
};

// Cierre de sesión
const logout = () => {
  localStorage.removeItem('token');
};

export default { register, login, logout };
