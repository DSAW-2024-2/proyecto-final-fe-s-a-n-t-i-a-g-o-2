import React, { useState, useContext, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import logo from '../../assets/Deskpinchados-8-10-2024.png'; // Ruta relativa del logo
import fondo from '../../assets/WhatsApp Image 2024-10-24 at 22.52.36_36367a8d.jpg'; // Ruta relativa del fondo

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
        email: user.email || '',
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
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('lastname', formData.lastname);
    data.append('contact', formData.contact);
    data.append('iduni', formData.iduni);

    if (formData.photo) {
      data.append('photo', formData.photo);
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
    return <div className="text-center mt-10 text-white">Cargando...</div>;
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />
      <div className="container mx-auto p-6 flex-grow text-white">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Deskpinchados" className="w-40" />
        </div>
        <h2 className="text-3xl font-bold text-green-500 text-center mb-6">
          Actualizar Perfil
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg max-w-lg mx-auto"
        >
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Apellido</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Correo Corporativo</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-gray-400 cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Número de Contacto</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-500 mb-2">ID Universidad</label>
            <input
              type="text"
              name="iduni"
              value={formData.iduni}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-500 mb-2">Foto (Opcional)</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
              accept="image/*"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
              onClick={() => navigate('/profile')}
            >
              Volver
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
