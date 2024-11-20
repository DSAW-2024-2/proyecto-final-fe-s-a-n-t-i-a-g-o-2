import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import fondo from '../../assets/WhatsApp Image 2024-10-24 at 22.52.36_36367a8d.jpg'; // Ruta relativa del fondo
import logo from '../../assets/Deskpinchados-8-10-2024.png'; // Ruta relativa del logo

const NewTrip = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    start: '',
    end: '',
    route: '',
    departure: '',
    price: '',
    seats: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'seats' || name === 'price') {
      setFormData({ ...formData, [name]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user || !user.token) {
        throw new Error('Usuario no autenticado o token no disponible.');
      }

      await api.post('/trips/newtrip', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert('Viaje registrado exitosamente.');
      navigate('/main-menu');
    } catch (error) {
      console.error('Error al registrar el viaje:', error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert('Error al registrar el viaje.');
      }
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
          Crear Nuevo Viaje
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg max-w-lg mx-auto"
        >
          {/* Campo Punto de Inicio */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Punto de Inicio</label>
            <input
              type="text"
              name="start"
              value={formData.start}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              placeholder="Ejemplo: Ciudad A"
            />
          </div>
          {/* Campo Punto de Destino */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Punto de Destino</label>
            <input
              type="text"
              name="end"
              value={formData.end}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              placeholder="Ejemplo: Ciudad B"
            />
          </div>
          {/* Campo Ruta */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Ruta</label>
            <input
              type="text"
              name="route"
              value={formData.route}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              placeholder="Ejemplo: Autopista, Calle 80, etc."
            />
          </div>
          {/* Campo Fecha y Hora de Salida */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Fecha y Hora de Salida</label>
            <input
              type="datetime-local"
              name="departure"
              value={formData.departure}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
            />
          </div>
          {/* Campo Precio */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              placeholder="Ejemplo: 15.50"
            />
          </div>
          {/* Campo Asientos Disponibles */}
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Asientos Disponibles</label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              placeholder="Ejemplo: 3"
            />
          </div>
          {/* Botones */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Crear Viaje
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

export default NewTrip;
