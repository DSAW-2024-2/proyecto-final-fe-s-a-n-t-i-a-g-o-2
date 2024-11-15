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
      // Enviar los datos al backend
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
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Apellido</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ID Universidad</label>
            <input
              type="text"
              name="iduni"
              value={formData.iduni}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Número de Contacto</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Campo 'photo' */}
          <div className="mb-4">
            <label className="block text-gray-700">Foto de Perfil (URL)</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Ingresa la URL de tu foto de perfil"
            />
          </div>

          {/* Información del Vehículo */}
          <hr className="my-6" />
          <h3 className="text-xl font-bold mb-4">Información del Vehículo</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Placa del Vehículo</label>
            <input
              type="text"
              name="placa"
              value={formData.placa}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Capacidad del Vehículo</label>
            <input
              type="number"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Campos adicionales como 'soat' y 'carro' */}
          <div className="mb-4">
            <label className="block text-gray-700">Foto del SOAT (URL)</label>
            <input
              type="text"
              name="soat"
              value={formData.soat}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Ingresa la URL de la foto del SOAT"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipo de Vehículo</label>
            <input
              type="text"
              name="carro"
              value={formData.carro}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Ejemplo: Sedán, SUV, etc."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
