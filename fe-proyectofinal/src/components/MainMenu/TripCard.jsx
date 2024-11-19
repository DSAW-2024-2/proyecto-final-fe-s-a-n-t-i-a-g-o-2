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
        <strong>Salida:</strong> {new Date(trip.departure).toLocaleString()}
      </p>
      <p className="mb-1">
        <strong>Precio:</strong> ${trip.price.toFixed(2)}
      </p>
      <p className="mb-1">
        <strong>Asientos Disponibles:</strong> {trip.seats}
      </p>
      {/* Botón para reservar o más acciones */}
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Reservar
      </button>
    </div>
  );
};

export default TripCard;
