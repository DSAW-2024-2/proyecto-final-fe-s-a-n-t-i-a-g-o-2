import axios from 'axios';

const API_URL = 'https://proyecto-final-be-s-a-n-t-i-a-g-o-2.vercel.app';

// Interceptor para agregar el token en cada solicitud
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Registro de usuario
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    const user = response.data.user;
    localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
    return user; // Retorna los datos del usuario registrados
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

// Inicio de sesión
const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/login`,
      { correo: email, contraseña: password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
    return response.data; // Devuelve los datos del usuario o el token
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw error;
  }
};

// Cierre de sesión
const logout = () => {
  localStorage.removeItem('token'); // Elimina el token de localStorage
};

export default { register, login, logout };
