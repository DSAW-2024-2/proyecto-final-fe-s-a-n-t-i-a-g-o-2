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

    // Si el campo es 'email', no hacemos nada ya que está deshabilitado
    if (name === 'email') return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = user.uid;

      if (!userId) {
        throw new Error('ID de usuario no encontrado.');
      }

      // Excluir el email del formData para no enviarlo al backend
      const { email, ...dataToUpdate } = formData;

      // Realizar la solicitud PUT al backend
      const response = await api.put(`/users/${userId}`, dataToUpdate);

      alert('Perfil actualizado exitosamente.');

      // Actualizar el contexto del usuario con los nuevos datos
      setUser({ ...user, ...dataToUpdate });
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
          {/* Campo Nombre */}
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
          {/* Campo Apellido */}
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
          {/* Campo Email (Deshabilitado) */}
          <div className="mb-4">
            <label className="block mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled // Campo deshabilitado
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-400 cursor-not-allowed"
            />
          </div>
          {/* Campo Contacto */}
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
          {/* Campo ID Universidad */}
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
          {/* Campo Foto */}
          <div className="mb-4">
            <label className="block mb-1">URL de Foto de Perfil</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
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
