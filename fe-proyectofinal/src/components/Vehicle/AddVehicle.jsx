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
      const userId = user.uid;

      if (!userId) {
        throw new Error('ID de usuario no encontrado.');
      }

      // Incluimos el 'uid' en los datos enviados al backend
      const response = await api.post('/cars/add', { ...formData, uid: userId });
      alert('Vehículo registrado exitosamente.');
      navigate('/profile');
    } catch (error) {
      console.error('Error al registrar el vehículo:', error);
      alert('Error al registrar el vehículo.');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Registrar Vehículo</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
          {/* Formulario para ingresar los datos del vehículo */}
          {/* ... */}
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
