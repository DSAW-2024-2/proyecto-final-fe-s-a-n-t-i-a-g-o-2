// src/components/Vehicle/VehicleProfile.jsx
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import api from '../../services/api';

const VehicleProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        // Verificar que el usuario esté autenticado y tenga un token
        if (!user || !user.token) {
          throw new Error('Usuario no autenticado o token no disponible.');
        }

        // Si el vehicleuid no está en el usuario, obtenerlo desde el backend
        let vehicleuid = user.vehicleuid;

        if (!vehicleuid) {
          // Obtener la información actualizada del usuario
          const userResponse = await api.get(`/users/${user._id}`);
          const updatedUser = { ...userResponse.data.user, token: user.token }; // Mantener el token
          setUser(updatedUser);
          vehicleuid = updatedUser.vehicleuid;
        }

        if (!vehicleuid) {
          console.error('El usuario no tiene un vehicleuid asignado.');
          setIsLoading(false);
          return;
        }

        // Obtener la información del vehículo utilizando el vehicleuid
        const response = await api.get(`/cars/${vehicleuid}`);
        setCar(response.data.vehicle);
      } catch (error) {
        console.error('Error al obtener el vehículo:', error);
        if (error.response && error.response.status === 401) {
          alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
          navigate('/login');
        } else {
          alert('Error al obtener los datos del vehículo.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchCarData();
    } else {
      setIsLoading(false);
    }
  }, [user, setUser, navigate]);

  if (isLoading) {
    return <div className="text-center mt-10">Cargando datos del vehículo...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">Usuario no autenticado.</div>;
  }

  if (!car) {
    return (
      <div className="text-center mt-10">
        No se encontró información del vehículo. Por favor, regístrelo.
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          onClick={() => navigate('/edit-vehicle')}
        >
          Registrar Vehículo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6 text-center">Mi Vehículo</h2>
        <div className="bg-gray-800 p-6 rounded shadow-md max-w-lg mx-auto">
          <p className="mb-2">
            <strong>Placa:</strong> {car.placa || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Marca:</strong> {car.marca || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Modelo:</strong> {car.modelo || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Capacidad:</strong> {car.capacidad || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Tipo de Vehículo:</strong> {car.carro || 'No disponible'}
          </p>
          {car.soat && (
            <div className="mb-2">
              <strong>Foto del SOAT:</strong>
              <img src={car.soat} alt="Foto del SOAT" className="w-32 h-32 rounded-full mt-2" />
            </div>
          )}
          <div className="mt-6 flex flex-col items-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 w-full max-w-xs"
              onClick={() => navigate('/edit-vehicle')}
            >
              Editar Vehículo
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full max-w-xs"
              onClick={() => navigate('/main-menu')}
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

export default VehicleProfile;
