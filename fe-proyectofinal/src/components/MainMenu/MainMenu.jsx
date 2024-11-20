import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import TripCard from './TripCard';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

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
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        {/* Mostrar mensaje de bienvenida si el usuario está autenticado */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {user ? `Bienvenido, ${user.name}` : 'Menú Principal'}
        </h2>

        {/* Botones de navegación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => navigate('/new-trip')}
          >
            Crear Nuevo Viaje
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate('/add-vehicle')}
          >
            Registrar Vehículo
          </button>
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-center">Filtrar Viajes</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Punto de Inicio"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="p-2 rounded bg-gray-700 border border-gray-600 text-white flex-grow"
            />
            <input
              type="number"
              placeholder="Mínimo de Asientos"
              value={minSeats}
              onChange={(e) => setMinSeats(e.target.value)}
              className="p-2 rounded bg-gray-700 border border-gray-600 text-white flex-grow"
            />
            <button
              onClick={handleFilter}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>

        {/* Lista de viajes disponibles */}
        <h2 className="text-2xl font-bold mb-6 text-center">Viajes Disponibles</h2>
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
