// src/components/Trips/ReserveTrip.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../Header';
import Footer from '../Footer';

const ReserveTrip = () => {
  const { tripID } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [seatsReserved, setSeatsReserved] = useState(1);
  const [pickupPoint, setPickupPoint] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(`/trips/${tripID}`);
        setTrip(response.data.trip);
      } catch (error) {
        console.error('Error al obtener el viaje:', error);
        alert('Error al cargar el viaje.');
        navigate('/main-menu');
      }
    };

    fetchTrip();
  }, [tripID, navigate]);

  const handleReserve = async () => {
    try {
      const data = {
        tripID,
        seatsReserved,
        pickupPoint,
      };
      await api.post('/trips/select', data);
      alert('Reserva realizada exitosamente.');
      navigate('/main-menu');
    } catch (error) {
      console.error('Error al reservar el viaje:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert('Error al reservar el viaje.');
      }
    }
  };

  if (!trip) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto p-6 flex-grow">
          <p>Cargando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6 text-center">Reservar Viaje</h2>
        <div className="bg-gray-800 p-6 rounded shadow-md max-w-md mx-auto">
          <p className="mb-2">
            <strong>Ruta:</strong> {trip.route}
          </p>
          <p className="mb-2">
            <strong>Desde:</strong> {trip.start}
          </p>
          <p className="mb-2">
            <strong>Hasta:</strong> {trip.end}
          </p>
          <p className="mb-2">
            <strong>Salida:</strong> {new Date(trip.departure).toLocaleString()}
          </p>
          <p className="mb-2">
            <strong>Precio por asiento:</strong> ${trip.price.toFixed(2)}
          </p>
          <p className="mb-2">
            <strong>Asientos disponibles:</strong> {trip.seats}
          </p>
          <div className="mt-4">
            <label className="block mb-1">Número de asientos a reservar</label>
            <input
              type="number"
              min="1"
              max={trip.seats}
              value={seatsReserved}
              onChange={(e) => setSeatsReserved(parseInt(e.target.value))}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-1">Punto de encuentro</label>
            <input
              type="text"
              value={pickupPoint}
              onChange={(e) => setPickupPoint(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          <button
            onClick={handleReserve}
            className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Confirmar Reserva
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReserveTrip;
