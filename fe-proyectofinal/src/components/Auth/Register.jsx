// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    iduni: '',
    email: '',
    contact: '',
    password: '',
    photo: '',
    // Campos adicionales relacionados con el vehículo
    placa: '',
    soat: '',
    carro: '',
    capacidad: '',
    marca: '',
    modelo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos al backend sin el campo 'role'
      await api.post('/users/register', formData);

      // Redirigir al menú principal
      navigate('/main-menu');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro de Conductor</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos requeridos por el backend */}
          {/* ... (el resto del formulario permanece igual) ... */}
        </form>
      </div>
    </div>
  );
};

export default Register;
