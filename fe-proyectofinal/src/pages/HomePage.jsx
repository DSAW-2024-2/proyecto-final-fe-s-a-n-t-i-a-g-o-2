// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Bienvenido a Despinchados</h1>
        <p className="mb-6">La mejor aplicación de viajes universitarios.</p>
        <div>
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-600"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
