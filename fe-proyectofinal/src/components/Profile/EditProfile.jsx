// src/components/Profile/EditProfile.jsx
import React, { useState, useContext, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    contact: '',
    iduni: '',
    photo: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastname: user.lastname || '',
        email: user.email || '', // Mantener el email para mostrarlo
        contact: user.contact || '',
        iduni: user.iduni || '',
        photo: user.photo || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') return; // No permitir cambios en el email
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] }); // Guardar el archivo seleccionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('lastname', formData.lastname);
    data.append('contact', formData.contact);
    data.append('iduni', formData.iduni);

    if (formData.photo) {
      data.append('photo', formData.photo); // Agregar la foto solo si fue seleccionada
    }

    try {
      const userId = user.uid;

      if (!userId) {
        throw new Error('ID de usuario no encontrado.');
      }

      const response = await api.put(`/users/${userId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Perfil actualizado exitosamente.');
      // Actualizar el contexto del usuario
      setUser({ ...user, ...response.data });
      navigate('/profile');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error al actualizar el perfil.');
      }
    }
  };

  if (!user) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md">
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
          <div className="mb-4">
            <label className="block mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-400 cursor-not-allowed"
            />
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
            <label className="block mb-1">Foto de Perfil</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              accept="image/*"
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
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => navigate('/profile')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;