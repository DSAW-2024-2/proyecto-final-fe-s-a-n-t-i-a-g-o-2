import axios from 'axios';

const API_URL = 'https://proyecto-final-be-s-a-n-t-i-a-g-o-2.vercel.app';

// Registro de usuario (sin encabezado de autorización)
const register = async (userData) => {
  try {
    console.log("Datos enviados al backend:", userData); // Depuración de datos enviados al backend
    const response = await axios.post(`${API_URL}/users/register`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    const user = response.data.user;
    return user; // Retorna los datos del usuario registrado
  } catch (error) {
    if (error.response) {
      console.error('Error en el registro - respuesta del servidor:', error.response.data);
    } else {
      console.error('Error en el registro:', error.message);
    }
    throw error;
  }
};

// Inicio de sesión (agrega el token al localStorage)
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { correo: email, contraseña: password }, {
      headers: { 'Content-Type': 'application/json' },
    });
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

// Función auxiliar para configurar solicitudes autenticadas
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default { register, login, logout, getAuthHeaders };
