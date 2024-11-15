// src/components/MainMenu/MainMenu.jsx
import React, { useContext } from 'react';
import Header from '../Header';
import TripCard from './TripCard';
import Filters from './Filters';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <div>Cargando...</div>;
  }

  // Imprimir el objeto user para depuración
  console.log('Usuario:', user);

  // Supongamos que tienes una lista de viajes disponibles
  const trips = [
    // ... tus datos de prueba o datos obtenidos del backend
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-xl mb-4">Bienvenido, {user.name}</h2>
        {user.role === 'driver' && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
            onClick={() => navigate('/new-trip')}
          >
            Crear Nuevo Viaje
          </button>
        )}
        <Filters />
        <h3 className="text-lg mt-6 mb-4">Viajes Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((trip, index) => (
            <TripCard key={index} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
