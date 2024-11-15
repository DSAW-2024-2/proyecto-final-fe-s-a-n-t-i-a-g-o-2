// src/components/Profile/Profile.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Apellido:</strong> {user.lastname}</p>
      <p><strong>Correo:</strong> {user.email}</p>
      <p><strong>Contacto:</strong> {user.contact}</p>
      {/* Otros campos según sea necesario */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Editar Perfil
      </button>
    </div>
  );
};

export default Profile;
