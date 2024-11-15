// src/components/MainMenu/TripCard.jsx
import React from 'react';

const TripCard = ({ trip }) => {
  return (
    <div className="bg-gray-800 p-4 rounded">
      <h4 className="text-lg font-bold">{trip.route}</h4>
      <p>Conductor: {trip.driverName}</p>
      <p>Ruta: {trip.routeType}</p>
      <p>Cupos Disponibles: {trip.availableSeats}</p>
      <p>Hora de salida: {trip.departureTime}</p>
      <p>Tarifa: {trip.fare}</p>
      {/* Campos adicionales y funcionalidades */}
      <button className="bg-green-500 mt-2 px-4 py-2 rounded">Reservar</button>
    </div>
  );
};

export default TripCard;
