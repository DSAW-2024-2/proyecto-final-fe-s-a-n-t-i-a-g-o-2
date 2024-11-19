// src/components/Vehicle/EditVehicle.jsx
import React, { useState, useContext, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const EditVehicle = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    capacidad: '',
    carro: '',
    soat: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        if (!user || !user.uid) {
          throw new Error('Usuario no autenticado o UID no disponible.');
        }

        console.log('Obteniendo datos del vehículo para el UID:', user.uid);

        const response = await api.get(`/cars/${user.uid}`);
        console.log('Datos del vehículo recibidos:', response.data);

        setFormData({
          placa: response.data.vehicle.placa || '',
          marca: response.data.vehicle.marca || '',
          modelo: response.data.vehicle.modelo || '',
          capacidad: response.data.vehicle.capacidad || '',
          carro: response.data.vehicle.carro || '',
          soat: response.data.vehicle.soat || '',
        });

        setIsEditing(true);
      } catch (error) {
        console.error('Error al obtener los datos del vehículo:', error);
        if (error.response && error.response.status === 404) {
          setIsEditing(false);
        } else if (error.response && error.response.status === 401) {
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
      fetchVehicleData();
    } else {
      setIsLoading(false);
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'capacidad') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user || !user.uid) {
        throw new Error('ID de usuario no encontrado.');
      }

      if (isEditing) {
        await api.put(`/cars/${user.uid}`, formData);
        alert('Vehículo actualizado exitosamente.');
      } else {
        await api.post('/cars/add', { ...formData, uid: user.uid });
        alert('Vehículo registrado exitosamente.');
      }

      navigate('/vehicle');
    } catch (error) {
      console.error('Error al guardar los datos del vehículo:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.response && error.response.status === 401) {
        alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        navigate('/login');
      } else {
        alert('Error al guardar los datos del vehículo.');
      }
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Cargando datos del vehículo...</div>;
  }

  return (
    // Aquí va el formulario con los campos para editar o registrar el vehículo
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
              name="carro"
              value={formData.carro}
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
