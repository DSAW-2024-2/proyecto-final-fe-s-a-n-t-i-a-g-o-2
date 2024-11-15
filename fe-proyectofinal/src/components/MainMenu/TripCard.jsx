// src/components/MainMenu/TripCard.jsx
import React from 'react';

const TripCard = ({ trip }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-2">Ruta: {trip.route}</h3>
      <p className="mb-1">
        <strong>Desde:</strong> {trip.start}
      </p>
      <p className="mb-1">
        <strong>Hasta:</strong> {trip.end}
      </p>
      <p className="mb-1">
        <strong>Salida:</strong> {trip.departure}
      </p>
      <p className="mb-1">
        <strong>Precio:</strong> ${trip.price}
      </p>
      {/* Puedes agregar más información o acciones aquí */}
    </div>
  );
};

export default TripCard;
