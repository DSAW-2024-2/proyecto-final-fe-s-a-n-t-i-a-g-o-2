import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { AuthContext } from '../../contexts/AuthContext';

const MainMenu = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        {/* Mostrar mensaje de bienvenida si el usuario está autenticado */}
        {user ? (
          <h2 className="text-2xl font-bold mb-6">Bienvenido, {user.name}</h2>
        ) : (
          <h2 className="text-2xl font-bold mb-6">Menú Principal</h2>
        )}

        {/* Botones de navegación organizados en una cuadrícula */}
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
      </div>
      <Footer />
    </div>
  );
};

export default MainMenu;
