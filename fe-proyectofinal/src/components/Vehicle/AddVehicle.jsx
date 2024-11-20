import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../Header';
import Footer from '../Footer';
import fondo from '../../assets/WhatsApp Image 2024-10-24 at 22.52.36_36367a8d.jpg'; // Ruta relativa del fondo
import logo from '../../assets/Deskpinchados-8-10-2024.png'; // Ruta relativa del logo

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
  const [mensaje, setMensaje] = useState('');

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
    setMensaje('');

    if (!user || !user.token) {
      setMensaje('Usuario no autenticado.');
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append('placa', formData.placa);
    data.append('marca', formData.marca);
    data.append('modelo', formData.modelo);
    data.append('capacidad', formData.capacidad);

    if (formData.carro) {
      data.append('carro', formData.carro);
    }
    if (formData.soat) {
      data.append('soat', formData.soat);
    }

    try {
      await axios.post('/api/vehicles/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      });

      setMensaje('Vehículo registrado exitosamente.');
      setFormData({
        placa: '',
        marca: '',
        modelo: '',
        capacidad: '',
        carro: null,
        soat: null,
      });
      setTimeout(() => {
        navigate('/main-menu');
      }, 2000);
    } catch (error) {
      console.error('Error al registrar el vehículo:', error);
      if (error.response && error.response.data.message) {
        setMensaje(`Error: ${error.response.data.message}`);
      } else {
        setMensaje('Error al registrar el vehículo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {/* Logo y título */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Deskpinchados" className="w-40" />
        </div>
        <h2 className="text-3xl font-bold text-green-500 text-center mb-6">
          Registrar Vehículo
        </h2>
        {mensaje && (
          <div
            className={`mb-4 p-4 rounded text-center ${
              mensaje.startsWith('Error') ? 'bg-red-600' : 'bg-green-600'
            }`}
          >
            {mensaje}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg max-w-lg mx-auto"
          encType="multipart/form-data"
        >
          {/* Campo Placa */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Placa del Vehículo</label>
            <input
              type="text"
              name="placa"
              value={formData.placa}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              placeholder="Ingresa la placa de tu vehículo"
            />
          </div>
          {/* Campo Marca */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              placeholder="Ingresa la marca de tu vehículo"
            />
          </div>
          {/* Campo Modelo */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              placeholder="Ingresa el modelo de tu vehículo"
            />
          </div>
          {/* Campo Capacidad */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Capacidad del Vehículo</label>
            <input
              type="number"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              placeholder="Ingresa la capacidad de tu vehículo"
            />
          </div>
          {/* Campo Foto del Vehículo */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Foto del Vehículo (Opcional)</label>
            <input
              type="file"
              name="carro"
              onChange={handleFileChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              accept="image/*"
            />
          </div>
          {/* Campo Foto del SOAT */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Foto del SOAT (Opcional)</label>
            <input
              type="file"
              name="soat"
              onChange={handleFileChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              accept="image/*"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className={`bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrar Vehículo'}
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
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
