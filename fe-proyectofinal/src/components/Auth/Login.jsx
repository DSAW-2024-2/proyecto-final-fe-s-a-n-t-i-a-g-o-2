// src/components/Auth/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full mb-2 p-2 border"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full mb-2 p-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
