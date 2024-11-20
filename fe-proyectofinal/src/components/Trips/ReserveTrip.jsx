import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../Header';
import Footer from '../Footer';
import fondo from '../../assets/WhatsApp Image 2024-10-24 at 22.52.36_36367a8d.jpg'; // Ruta relativa del fondo

const ReserveTrip = () => {
  const { driverUID } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [seatsReserved, setSeatsReserved] = useState(1);
  const [pickupPoint, setPickupPoint] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(`/trips/driver/${driverUID}`);
        setTrip(response.data.trip);
      } catch (error) {
        console.error('Error al obtener el viaje:', error);
        alert('Error al cargar el viaje.');
        navigate('/main-menu');
      }
    };

    fetchTrip();
  }, [driverUID, navigate]);

  const handleReserve = async () => {
    try {
      const data = {
        driverUID,
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
      <div
        className="bg-gray-900 text-white min-h-screen flex flex-col"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Header />
        <div className="container mx-auto p-6 flex-grow">
          <p className="text-center text-lg">Cargando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />
      <div className="container mx-auto p-6 flex-grow text-white">
        <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
          Reservar Viaje
        </h2>
        <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <div className="mb-4">
            <p className="text-lg">
              <strong className="text-green-500">Conductor:</strong> {trip.driverName}
            </p>
            <p className="text-lg">
              <strong className="text-green-500">Ruta:</strong> {trip.route}
            </p>
            <p className="text-lg">
              <strong className="text-green-500">Cupos Disponibles:</strong> {trip.seats}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Número de asientos a reservar</label>
            <input
              type="number"
              min="1"
              max={trip.seats}
              value={seatsReserved}
              onChange={(e) => setSeatsReserved(parseInt(e.target.value))}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Punto de encuentro</label>
            <input
              type="text"
              value={pickupPoint}
              onChange={(e) => setPickupPoint(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleReserve}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 w-full"
            >
              Confirmar Reserva
            </button>
            <button
              onClick={() => navigate('/main-menu')}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 w-full"
            >
              Volver al Menú Principal
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReserveTrip;
