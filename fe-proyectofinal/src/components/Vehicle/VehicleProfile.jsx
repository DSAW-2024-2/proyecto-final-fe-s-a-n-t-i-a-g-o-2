// src/components/Vehicle/VehicleProfile.jsx
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const VehicleProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        if (!user || !user.uid) {
          throw new Error('Usuario no autenticado o UID no disponible.');
        }

        const userId = user.uid;
        console.log('Obteniendo datos del vehículo para el UID:', userId);

        const response = await api.get(`/cars/${userId}`);
        console.log('Datos del vehículo recibidos:', response.data);

        setVehicleData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del vehículo:', error);
        if (error.response && error.response.status === 404) {
          setVehicleData(null);
        } else {
          alert('Error al obtener los datos del vehículo.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchVehicleData();
    }
  }, [user]);

  if (isLoading) {
    return <div className="text-center mt-10">Cargando datos del vehículo...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Mi Vehículo</h2>
        <div className="bg-gray-800 p-6 rounded shadow-md">
          <p className="mb-2">
            <strong>Placa:</strong> {vehicleData?.placa || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Marca:</strong> {vehicleData?.marca || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Modelo:</strong> {vehicleData?.modelo || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Capacidad:</strong> {vehicleData?.capacidad || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Tipo de Vehículo:</strong> {vehicleData?.carro || 'No disponible'}
          </p>
          {vehicleData?.soat ? (
            <div className="mb-2">
              <strong>Foto del SOAT:</strong>
              <img
                src={vehicleData.soat}
                alt="Foto del SOAT"
                className="w-32 h-32 rounded mt-2 border-2 border-gray-500"
              />
            </div>
          ) : (
            <p className="mb-2">
              <strong>Foto del SOAT:</strong> No disponible
            </p>
          )}
          <div className="mt-6 flex">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
              onClick={() => navigate('/edit-vehicle')}
            >
              Editar Vehículo
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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