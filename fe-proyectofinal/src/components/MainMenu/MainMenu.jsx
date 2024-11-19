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

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get('/trips/alltrips');
        setTrips(response.data);
      } catch (error) {
        console.error('Error al obtener los viajes:', error);
        alert('Error al cargar los viajes. Inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

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

        {/* Lista de viajes disponibles */}
        <h2 className="text-2xl font-bold mb-6 text-center">Viajes Disponibles</h2>
        {isLoading ? (
          <div className="text-center">Cargando viajes...</div>
        ) : trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
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
