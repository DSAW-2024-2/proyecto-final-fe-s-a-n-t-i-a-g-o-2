// src/components/Profile/EditProfile.jsx
import React, { useState, useContext, useEffect } from 'react';
import Header from '../Header';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
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
        email: user.email || '',
        contact: user.contact || '',
        iduni: user.iduni || '',
        photo: user.photo || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = user.uid || user.id || user._id;
      if (!userId) {
        throw new Error('ID de usuario no encontrado.');
      }

      const response = await api.put(`/users/${userId}`, formData);
      alert('Perfil actualizado exitosamente.');
      setUser({ ...response.data.user, token: user.token }); // Mantener el token
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
          {/* Campos para editar */}
          {/* ... */}
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
