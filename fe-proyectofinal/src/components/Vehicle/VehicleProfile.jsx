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

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        // Obtener la información del vehículo
        const response = await api.get(`/cars/${user._id}`);
        setCar(response.data.car);
      } catch (error) {
        console.error('Error al obtener el vehículo:', error);
        if (error.response && error.response.status === 401) {
          alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
          navigate('/login');
        }
        // Si el usuario no tiene vehículo, no hacemos nada
      }
    };

    if (user) {
      fetchCarData();
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6 text-center">Mi Vehículo</h2>
        <div className="bg-gray-800 p-6 rounded shadow-md max-w-lg mx-auto">
          <p className="mb-2">
            <strong>Placa:</strong> {car?.placa || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Marca:</strong> {car?.marca || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Modelo:</strong> {car?.modelo || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Capacidad:</strong> {car?.capacidad || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Tipo de Vehículo:</strong> {car?.carro || 'No disponible'}
          </p>
          {car?.soat && (
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
              {car ? 'Editar Vehículo' : 'Registrar Vehículo'}
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
