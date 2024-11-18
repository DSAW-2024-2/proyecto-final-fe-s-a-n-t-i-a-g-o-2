// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener el usuario del localStorage al cargar la aplicación
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.token) {
      setUser(storedUser);
      api.defaults.headers.common['Authorization'] = `Bearer ${storedUser.token}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password });
      console.log('Respuesta del backend:', response.data);

      // Asumimos que la respuesta del backend incluye el token y los datos del usuario en el nivel superior
      const { token, uid, ...userData } = response.data;

      // Verificar que el uid y el token están presentes
      if (!uid || !token) {
        throw new Error('Respuesta del servidor inválida. Faltan token o uid.');
      }

      // Construir el objeto usuario con el token y el uid
      const userWithToken = { uid, ...userData, token };

      // Almacenar el usuario con el token en el localStorage
      localStorage.setItem('user', JSON.stringify(userWithToken));
      setUser(userWithToken);

      // Establecer el token en los headers de las futuras solicitudes
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      navigate('/main-menu');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
