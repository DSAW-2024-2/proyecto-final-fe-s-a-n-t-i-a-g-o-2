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
    if (storedUser) {
      setUser(storedUser);
      api.defaults.headers.common['Authorization'] = `Bearer ${storedUser.token}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password });
      const { token, uid, role } = response.data;

      // Obtener los datos completos del usuario
      const userResponse = await api.get(`/users/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = userResponse.data.user;

      // Añadir el rol al objeto 'userData'
      userData.role = role;

      localStorage.setItem('user', JSON.stringify({ ...userData, token }));
      setUser({ ...userData, token });

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
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
