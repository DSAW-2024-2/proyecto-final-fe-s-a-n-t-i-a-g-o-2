import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

const TripCard = ({ trip, onTripDeleted }) => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleReserve = () => {
    navigate(`/reserve-trip/${trip.driverUID}`);
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
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg border border-gray-700">
      <h3 className="text-lg font-bold text-green-500 mb-2">
        {trip.route} - {trip.end}
      </h3>
      <p className="mb-1">
        <strong>Conductor:</strong> {trip.driverName}
      </p>
      <p className="mb-1">
        <strong>Ruta:</strong> {trip.route}
      </p>
      <p className="mb-1">
        <strong>Cupos Disponibles:</strong> {trip.seats}
      </p>
      <p className="mb-1">
        <strong>Hora de salida:</strong> {new Date(trip.departure).toLocaleString()}
      </p>
      <p className="mb-4">
        <strong>Tarifa:</strong> ${trip.price.toFixed(2)}
      </p>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-1">Cupos a reservar</label>
        <select
          className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Seleccionar</option>
          {[...Array(trip.seats).keys()].map((seat) => (
            <option key={seat} value={seat + 1}>
              {seat + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-1">Lugar de recogida</label>
        <input
          type="text"
          placeholder="Ingresa punto de partida"
          className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      {isCreator ? (
        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Eliminar Viaje
        </button>
      ) : (
        <button
          onClick={handleReserve}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Reservar
        </button>
      )}
    </div>
  );
};

export default TripCard;
