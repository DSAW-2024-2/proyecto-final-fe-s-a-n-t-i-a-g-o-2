// src/components/Profile/Profile.jsx
import React, { useContext } from 'react';
import Header from '../Header';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Mi Perfil</h2>
        <div className="bg-gray-800 p-6 rounded shadow-md">
          <p className="mb-2">
            <strong>Nombre:</strong> {user.name}
          </p>
          <p className="mb-2">
            <strong>Apellido:</strong> {user.lastname}
          </p>
          <p className="mb-2">
            <strong>Correo:</strong> {user.email}
          </p>
          <p className="mb-2">
            <strong>Contacto:</strong> {user.contact}
          </p>
          <p className="mb-2">
            <strong>ID Universidad:</strong> {user.iduni}
          </p>
          <p className="mb-2">
            <strong>Foto de Perfil:</strong>{' '}
            {user.photo ? <img src={user.photo} alt="Foto de Perfil" className="w-32 h-32" /> : 'No disponible'}
          </p>
          {/* Información del vehículo */}
          <h3 className="text-xl font-bold mt-6 mb-4">Información del Vehículo</h3>
          <p className="mb-2">
            <strong>Placa:</strong> {user.placa}
          </p>
          <p className="mb-2">
            <strong>Marca:</strong> {user.marca}
          </p>
          <p className="mb-2">
            <strong>Modelo:</strong> {user.modelo}
          </p>
          <p className="mb-2">
            <strong>Capacidad:</strong> {user.capacidad}
          </p>
          <p className="mb-2">
            <strong>Tipo de Vehículo:</strong> {user.carro}
          </p>
          <p className="mb-2">
            <strong>Foto del SOAT:</strong>{' '}
            {user.soat ? <img src={user.soat} alt="Foto del SOAT" className="w-32 h-32" /> : 'No disponible'}
          </p>
          <div className="mt-6 flex">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
              onClick={() => navigate('/edit-profile')}
            >
              Editar Perfil
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => navigate('/main-menu')}
            >
              Volver al Menú Principal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
