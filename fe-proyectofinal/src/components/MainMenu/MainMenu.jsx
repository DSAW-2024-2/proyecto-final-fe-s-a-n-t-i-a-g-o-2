// src/components/MainMenu/MainMenu.jsx
import React, { useContext } from 'react';
import Header from '../Header';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const MainMenu = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        <h2 className="text-xl mb-4">Bienvenido, {user.name}</h2>
        {/* Botones para crear nuevo viaje y registrar vehículo */}
        <div className="flex space-x-4 mb-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => navigate('/new-trip')}
          >
            Crear Nuevo Viaje
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate('/add-vehicle')}
          >
            Registrar Vehículo
          </button>
        </div>
        {/* Aquí puedes agregar más contenido, como la lista de viajes disponibles */}
      </div>
      <Footer />
    </div>
  );
};

export default MainMenu;
