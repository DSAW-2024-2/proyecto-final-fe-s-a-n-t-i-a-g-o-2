// src/components/Profile/EditProfile.jsx
import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user.name || '',
    lastname: user.lastname || '',
    email: user.email || '',
    contact: user.contact || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${user.uid}`, formData);
      alert('Perfil actualizado exitosamente.');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al actualizar el perfil.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border"
        />
        {/* ... otros campos */}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
