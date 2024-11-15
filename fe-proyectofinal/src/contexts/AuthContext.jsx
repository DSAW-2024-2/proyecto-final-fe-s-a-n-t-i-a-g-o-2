// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password });
      const { token } = response.data;
      const userData = { email, token };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/main-menu');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
