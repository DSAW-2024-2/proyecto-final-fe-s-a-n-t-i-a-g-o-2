// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import api from '../../services/api';

const Register = () => {
  const [isDriver, setIsDriver] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    iduni: '',
    email: '',
    contact: '',
    password: '',
    // Campos adicionales para conductores
    vehiclePhoto: null,
    licensePlate: '',
    capacity: '',
    soatPhoto: null,
    brand: '',
    model: '',
  });

  const handleRoleChange = (role) => {
    setIsDriver(role === 'driver');
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Manejar archivos
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      // Campos comunes
      data.append('name', formData.name);
      data.append('lastname', formData.lastname);
      data.append('iduni', formData.iduni);
      data.append('email', formData.email);
      data.append('contact', formData.contact);
      data.append('password', formData.password);

      if (isDriver) {
        // Campos adicionales para conductores
        data.append('vehiclePhoto', formData.vehiclePhoto);
        data.append('licensePlate', formData.licensePlate);
        data.append('capacity', formData.capacity);
        data.append('soatPhoto', formData.soatPhoto);
        data.append('brand', formData.brand);
        data.append('model', formData.model);
      }

      // Realizar la petición al backend
      const endpoint = isDriver ? '/users/register' : '/passengers/register';
      await api.post(endpoint, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Registro exitoso. Ahora puedes iniciar sesión.');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => handleRoleChange('passenger')}
            className={`mr-2 px-4 py-2 rounded ${
              !isDriver ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Pasajero
          </button>
          <button
            onClick={() => handleRoleChange('driver')}
            className={`px-4 py-2 rounded ${
              isDriver ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Conductor
          </button>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Campos comunes */}
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

          {/* Si es conductor, mostrar campos adicionales */}
          {isDriver && (
            <>
              <hr className="my-6" />
              <h3 className="text-xl font-bold mb-4">Información del Vehículo</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Foto del Vehículo</label>
                <input
                  type="file"
                  name="vehiclePhoto"
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Placa del Vehículo</label>
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Marca</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Modelo</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Capacidad del Vehículo</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Foto del SOAT</label>
                <input
                  type="file"
                  name="soatPhoto"
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
            </>
          )}
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
