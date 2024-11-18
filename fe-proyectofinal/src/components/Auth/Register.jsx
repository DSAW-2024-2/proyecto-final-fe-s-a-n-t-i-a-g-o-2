// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', formData);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error al registrar. Por favor, intenta de nuevo.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro de Pasajero</h2>
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
              placeholder="Ingresa tu nombre"
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
              placeholder="Ingresa tu apellido"
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
              placeholder="Ingresa tu ID Universidad"
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
              placeholder="ejemplo@correo.com"
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
              placeholder="Ingresa tu número de contacto"
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
              placeholder="Ingresa tu contraseña"
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

          <div className="flex mt-6">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
