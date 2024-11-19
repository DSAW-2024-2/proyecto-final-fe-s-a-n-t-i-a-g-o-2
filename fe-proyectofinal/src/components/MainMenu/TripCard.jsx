// src/components/MainMenu/TripCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

const TripCard = ({ trip, onTripDeleted }) => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate(`/reserve-trip/${trip.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este viaje?')) {
      try {
        await api.delete(`/trips/${trip.id}`);
        alert('Viaje eliminado exitosamente.');
        onTripDeleted(trip.id);
      } catch (error) {
        console.error('Error al eliminar el viaje:', error);
        alert('Error al eliminar el viaje.');
      }
    }
  };

  const isCreator = user && trip.driverUID === user.uid;

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
      {/* Mostrar botón según el usuario */}
      {isCreator ? (
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Eliminar Viaje
        </button>
      ) : (
        <button
          onClick={handleReserve}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Reservar
        </button>
      )}
    </div>
  );
};

export default TripCard;
