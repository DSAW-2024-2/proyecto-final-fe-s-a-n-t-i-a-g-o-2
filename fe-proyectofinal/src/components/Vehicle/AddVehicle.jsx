import React, { useState, useContext } from 'react';
import axios from 'axios';
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
    carro: null, // Archivo para la foto del vehículo
    soat: null, // Archivo para la foto del SOAT
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user || !user.token) {
      alert('Usuario no autenticado.');
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append('placa', formData.placa);
    data.append('marca', formData.marca);
    data.append('modelo', formData.modelo);
    data.append('capacidad', formData.capacidad);
    
    // Solo agregar las imágenes si están presentes
    if (formData.carro) {
      data.append('carro', formData.carro);
    }
    if (formData.soat) {
      data.append('soat', formData.soat);
    }

    try {
      const response = await axios.post('/api/cars/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`, // Token de autenticación
        },
      });

      alert('Vehículo registrado exitosamente.');
      navigate('/main-menu');
    } catch (error) {
      console.error('Error al registrar el vehículo:', error);
      if (error.response && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error al registrar el vehículo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Registrar Vehículo</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md" encType="multipart/form-data">
          {/* Campo Placa */}
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
              placeholder="Ingresa la marca de tu vehículo"
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
              placeholder="Ingresa el modelo de tu vehículo"
            />
          </div>
          {/* Campo Capacidad */}
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
          {/* Campo Foto del Vehículo */}
          <div className="mb-4">
            <label className="block mb-1">Foto del Vehículo (Opcional)</label>
            <input
              type="file"
              name="carro"
              onChange={handleFileChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              accept="image/*"
            />
          </div>
          {/* Campo Foto del SOAT */}
          <div className="mb-4">
            <label className="block mb-1">Foto del SOAT (Opcional)</label>
            <input
              type="file"
              name="soat"
              onChange={handleFileChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              accept="image/*"
            />
          </div>

          <div className="flex mt-6">
            <button
              type="submit"
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Vehículo'}
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