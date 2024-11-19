// src/components/Vehicle/AddVehicle.jsx
import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../Header';
import Footer from '../Footer';


const AddVehicle = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    capacidad: '',
    soat: '',
    carro: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Si el campo es 'capacidad', convertir a número
    if (name === 'capacidad') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/cars/add', formData);
      alert('Vehículo registrado exitosamente.');
      navigate('/main-menu');
    } catch (error) {
      console.error('Error al registrar el vehículo:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error al registrar el vehículo.');
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Registrar Vehículo</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
          {/* Formulario para ingresar los datos del vehículo */}
          <div className="mb-4">
            <label className="block mb-1">Placa del Vehículo</label>
            <input
              type="text"
              name="placa"
              value={formData.placa}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              placeholder="Ingresa la placa de tu vehículo"
            />
          </div>
          {/* Resto de los campos del formulario */}
          <div className="mb-4">
            <label className="block mb-1">Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              placeholder="Ingresa la marca de tu vehículo"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              placeholder="Ingresa el modelo de tu vehículo"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Capacidad del Vehículo</label>
            <input
              type="number"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              placeholder="Ingresa la capacidad de tu vehículo"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Foto del SOAT (URL)</label>
            <input
              type="text"
              name="soat"
              value={formData.soat}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              placeholder="Ingresa la URL de la foto del SOAT"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Tipo de Vehículo</label>
            <input
              type="text"
              name="carro"
              value={formData.carro}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              placeholder="Ejemplo: Sedán, SUV, etc."
            />
          </div>

          <div className="flex mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
            >
              Registrar Vehículo
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => navigate('/main-menu')}
            >
              Volver al Menú Principal
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddVehicle;
