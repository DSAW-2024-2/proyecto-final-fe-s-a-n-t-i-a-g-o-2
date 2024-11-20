// src/components/Vehicle/EditVehicle.jsx
import React, { useState, useContext, useEffect } from 'react';
import Header from '../Header';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import api from '../../services/api';

const EditVehicle = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    capacidad: '',
    tipo: '',
    soat: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [vehicleuid, setVehicleuid] = useState('');

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        if (!user || !user.token) {
          throw new Error('Usuario no autenticado o token no disponible.');
        }

        let currentVehicleuid = user.vehicleuid;

        if (!currentVehicleuid) {
          // Obtener la información actualizada del usuario
          const userResponse = await api.get(`/users/${user.uid}`);
          const updatedUser = { ...userResponse.data.user, token: user.token };
          setUser(updatedUser);
          currentVehicleuid = updatedUser.vehicleuid;
        }

        if (currentVehicleuid) {
          // Obtener la información del vehículo
          const response = await api.get(`/cars/${currentVehicleuid}`);
          setFormData({
            placa: response.data.vehicle.placa || '',
            marca: response.data.vehicle.marca || '',
            modelo: response.data.vehicle.modelo || '',
            capacidad: response.data.vehicle.capacidad || '',
            tipo: response.data.vehicle.tipo || '',
            soat: response.data.vehicle.soat || '',
          });
          setIsEditing(true);
          setVehicleuid(currentVehicleuid);
        } else {
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error al obtener el vehículo:', error);
        if (error.response && error.response.status === 401) {
          alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
          navigate('/login');
        } else {
          // Si el usuario no tiene vehículo, estamos registrando uno nuevo
          setIsEditing(false);
        }
      }
    };

    if (user) {
      fetchVehicleData();
    }
  }, [user, navigate, setUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Actualizar vehículo existente
        await api.put(`/cars/${vehicleuid}`, formData);
        alert('Vehículo actualizado exitosamente.');
      } else {
        // Registrar nuevo vehículo
        const response = await api.post('/cars/add', { ...formData, uid: user.uid });
        const newVehicleuid = response.data.vehicleuid;

        // Actualizar el usuario con el nuevo vehicleuid
        const updatedUser = { ...user, vehicleuid: newVehicleuid };
        setUser(updatedUser);

        alert('Vehículo registrado exitosamente.');
      }
      navigate('/vehicle');
    } catch (error) {
      console.error('Error al guardar el vehículo:', error);
      if (error.response && error.response.status === 401) {
        alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        navigate('/login');
      } else {
        alert('Error al guardar el vehículo.');
      }
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Editar Vehículo' : 'Registrar Vehículo'}</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
          {/* Campos del formulario */}
          {/* Campo Placa */}
          <div className="mb-4">
            <label className="block mb-1">Placa</label>
            <input
              type="text"
              name="placa"
              value={formData.placa}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          {/* Campo Marca */}
          <div className="mb-4">
            <label className="block mb-1">Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          {/* Campo Modelo */}
          <div className="mb-4">
            <label className="block mb-1">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          {/* Campo Capacidad */}
          <div className="mb-4">
            <label className="block mb-1">Capacidad</label>
            <input
              type="number"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          {/* Campo Tipo de Vehículo */}
          <div className="mb-4">
            <label className="block mb-1">Tipo de Vehículo</label>
            <input
              type="text"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          {/* Campo Foto del SOAT */}
          <div className="mb-4">
            <label className="block mb-1">URL de Foto del SOAT</label>
            <input
              type="text"
              name="soat"
              value={formData.soat}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          <div className="flex mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
            >
              {isEditing ? 'Guardar Cambios' : 'Registrar Vehículo'}
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => navigate('/vehicle')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditVehicle;
