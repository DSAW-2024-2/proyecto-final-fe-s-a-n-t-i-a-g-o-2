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

  const handleRoleChange = () => {
    setIsDriver(!isDriver);
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <button
        onClick={handleRoleChange}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Registrarse como {isDriver ? 'Pasajero' : 'Conductor'}
      </button>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Campos comunes */}
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="block w-full mb-2 p-2 border"
        />
        {/* ... otros campos comunes */}
        {/* Si es conductor, mostrar campos adicionales */}
        {isDriver && (
          <>
            <input
              type="file"
              name="vehiclePhoto"
              onChange={handleInputChange}
              required
              className="block w-full mb-2"
            />
            {/* ... otros campos para conductores */}
          </>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
