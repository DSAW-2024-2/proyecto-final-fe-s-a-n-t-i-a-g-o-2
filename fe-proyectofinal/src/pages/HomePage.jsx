import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Deskpinchados-8-10-2024.png'; // Ruta relativa del logo
import fondo from '../assets/WhatsApp Image 2024-10-24 at 22.52.36_36367a8d.jpg'; // Ruta relativa del fondo

const HomePage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen text-white"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center bg-black bg-opacity-75 p-8 rounded-lg shadow-lg max-w-lg">
        <div className="mb-6">
          <img src={logo} alt="Deskpinchados" className="mx-auto w-64" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-green-500">Bienvenido a Deskpinchados</h1>
        <p className="mb-6 text-lg">La mejor aplicación de viajes universitarios.</p>
        <div>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-4 hover:bg-blue-700"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
