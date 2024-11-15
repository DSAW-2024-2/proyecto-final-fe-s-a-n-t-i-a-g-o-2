// src/components/Profile/EditProfile.jsx
import React, { useState, useContext, useEffect } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    iduni: '',
    email: '',
    contact: '',
    photo: '',
    // Campos adicionales relacionados con el vehículo
    placa: '',
    soat: '',
    carro: '',
    capacidad: '',
    marca: '',
    modelo: '',
  });

  useEffect(() => {
    if (user) {
      // Inicializar el formulario con los datos actuales del usuario
      setFormData({
        name: user.name || '',
        lastname: user.lastname || '',
        iduni: user.iduni || '',
        email: user.email || '',
        contact: user.contact || '',
        photo: user.photo || '',
        placa: user.placa || '',
        soat: user.soat || '',
        carro: user.carro || '',
        capacidad: user.capacidad || '',
        marca: user.marca || '',
        modelo: user.modelo || '',
      });
    }
  }, [user]);

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
      // Enviar los datos actualizados al backend
      await api.put(`/users/${user.uid}`, formData);

      // Actualizar el contexto de autenticación con los nuevos datos
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      alert('Perfil actualizado exitosamente.');
      navigate('/profile');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al actualizar el perfil. Por favor, intenta de nuevo.');
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
          {/* Datos personales */}
          <div className="mb-4">
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Apellido</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          {/* Otros campos personales */}
          <div className="mb-4">
            <label className="block mb-1">ID Universidad</label>
            <input
              type="text"
              name="iduni"
              value={formData.iduni}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white cursor-not-allowed"
            />
            <p className="text-sm text-gray-400">No puedes cambiar tu correo electrónico.</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Número de Contacto</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          {/* Campo 'photo' */}
          <div className="mb-4">
            <label className="block mb-1">Foto de Perfil (URL)</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              placeholder="Ingresa la URL de tu foto de perfil"
            />
          </div>

          {/* Información del vehículo */}
          <hr className="my-6 border-gray-600" />
          <h3 className="text-xl font-bold mb-4">Información del Vehículo</h3>
          <div className="mb-4">
            <label className="block mb-1">Placa del Vehículo</label>
            <input
              type="text"
              name="placa"
              value={formData.placa}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Capacidad del Vehículo</label>
            <input
              type="number"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleInputChange}
              min="1"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          {/* Campos adicionales como 'soat' y 'carro' */}
          <div className="mb-4">
            <label className="block mb-1">Foto del SOAT (URL)</label>
            <input
              type="text"
              name="soat"
              value={formData.soat}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              placeholder="Ingresa la URL de la foto del SOAT"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Tipo de Vehículo</label>
            <input
              type="text"
              name="carro"
              value={formData.carro}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              placeholder="Ejemplo: Sedán, SUV, etc."
            />
          </div>

          <div className="flex mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => navigate('/profile')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
