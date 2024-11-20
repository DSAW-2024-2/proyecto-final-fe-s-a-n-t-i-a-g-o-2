import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import TripCard from './TripCard';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import logo from '../../assets/Deskpinchados-8-10-2024.png'; // Ruta relativa del logo
import fondo from '../../assets/WhatsApp Image 2024-10-24 at 22.52.36_36367a8d.jpg'; // Ruta relativa del fondo

const MainMenu = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filtros
  const [startPoint, setStartPoint] = useState('');
  const [minSeats, setMinSeats] = useState('');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async (filters = {}) => {
    setIsLoading(true);
    try {
      const response = await api.get('/trips/filter', {
        params: filters,
      });
      setTrips(response.data);
    } catch (error) {
      console.error('Error al obtener los viajes:', error);
      alert('Error al cargar los viajes. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = () => {
    const filters = {};
    if (startPoint) filters.startPoint = startPoint;
    if (minSeats) filters.minSeats = minSeats;
    fetchTrips(filters);
  };

  const handleTripDeleted = (deletedTripId) => {
    setTrips(trips.filter((trip) => trip.id !== deletedTripId));
  };

  if (!user) {
    return <div className="text-center mt-10">Usuario no autenticado.</div>;
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
        {/* Logo y bienvenida */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Deskpinchados" className="w-64 mb-4" />
          <h2 className="text-3xl font-bold text-center">
            Bienvenido, {user.name}!
          </h2>
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4 text-center">Filtrar Viajes</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Filtrar por punto de salida"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white flex-grow"
            />
            <input
              type="number"
              placeholder="Cupos mínimos"
              value={minSeats}
              onChange={(e) => setMinSeats(e.target.value)}
              className="p-3 rounded bg-gray-800 border border-gray-600 text-white flex-grow"
            />
            <button
              onClick={handleFilter}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>

        {/* Lista de viajes */}
        <h3 className="text-2xl font-bold mb-6 text-center">Viajes Disponibles</h3>
        {isLoading ? (
          <div className="text-center">Cargando viajes...</div>
        ) : trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onTripDeleted={handleTripDeleted} />
            ))}
          </div>
        ) : (
          <p className="text-center">No hay viajes disponibles en este momento.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainMenu;
