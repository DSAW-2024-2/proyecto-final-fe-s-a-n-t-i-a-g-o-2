// src/components/MainMenu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Menú Principal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate('/profile')}
          >
            Mi Perfil
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => navigate('/vehicle')}
          >
            Mi Vehículo
          </button>
          {/* Puedes agregar más opciones aquí */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainMenu;
