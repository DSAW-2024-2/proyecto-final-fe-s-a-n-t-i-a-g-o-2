// src/components/MainMenu/MainMenu.jsx
import React, { useContext } from 'react';
import Header from '../Header';
import TripCard from './TripCard';
import Filters from './Filters';
import { AuthContext } from '../../contexts/AuthContext';

const MainMenu = () => {
  const { user } = useContext(AuthContext);

  // Suponiendo que tienes una lista de viajes disponibles
  const trips = [
    {
      route: 'Calle 100 - U. Sabana',
      driverName: 'Camila López',
      routeType: 'Autopista',
      availableSeats: 1,
      departureTime: '7:00 AM',
      fare: '$6,000',
    },
    // ... más viajes
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-xl mb-4">Bienvenido, {user.name}</h2>
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
