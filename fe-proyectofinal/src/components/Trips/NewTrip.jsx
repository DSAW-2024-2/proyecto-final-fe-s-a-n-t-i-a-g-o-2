// src/components/Trips/NewTrip.jsx
import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const NewTrip = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    start: '',
    end: '',
    route: '',
    departure: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/trips/newtrip', formData);
      alert('Viaje registrado exitosamente.');
      navigate('/main-menu');
    } catch (error) {
      console.error('Error al registrar el viaje:', error);
      alert('Error al registrar el viaje.');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Crear Nuevo Viaje</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
          {/* ... (el resto del formulario permanece igual) ... */}
        </form>
      </div>
    </div>
  );
};

export default NewTrip;
