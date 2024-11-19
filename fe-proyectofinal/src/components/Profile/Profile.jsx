// src/components/Profile/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import api from '../../services/api';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtener la información actualizada del usuario
        const response = await api.get(`/users/${user._id}`);
        setUser({ ...response.data.user, token: user.token }); // Mantener el token
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        if (error.response && error.response.status === 401) {
          alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
          navigate('/login');
        }
      }
    };

    const fetchCarData = async () => {
      try {
        const response = await api.get(`/cars/${user._id}`);
        setCar(response.data.car);
      } catch (error) {
        console.error('Error al obtener el vehículo:', error);
        // Si el usuario no tiene vehículo, no hacemos nada
      }
    };

    if (user) {
      fetchUserData();
      fetchCarData();
    }
  }, [user, setUser, navigate]);

  if (!user) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6 text-center">Mi Perfil</h2>
        <div className="bg-gray-800 p-6 rounded shadow-md max-w-lg mx-auto">
          <p className="mb-2">
            <strong>Nombre:</strong> {user.name}
          </p>
          <p className="mb-2">
            <strong>Apellido:</strong> {user.lastname}
          </p>
          <p className="mb-2">
            <strong>Correo Electrónico:</strong> {user.email}
          </p>
          <p className="mb-2">
            <strong>Número de Contacto:</strong> {user.contact}
          </p>
          <p className="mb-2">
            <strong>ID Universidad:</strong> {user.iduni}
          </p>
          {user.photo && (
            <div className="mb-2">
              <strong>Foto de Perfil:</strong>
              <img src={user.photo} alt="Foto de Perfil" className="w-32 h-32 rounded-full mt-2" />
            </div>
          )}
          <div className="mt-6 flex flex-col items-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 w-full max-w-xs"
              onClick={() => navigate('/edit-profile')}
            >
              Editar Perfil
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full max-w-xs"
              onClick={() => navigate('/main-menu')}
            >
              Volver al Menú Principal
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
