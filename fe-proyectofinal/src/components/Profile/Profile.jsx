// src/components/Profile/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import api from '../../services/api';

const Profile = () => {
  const { user } = useContext(AuthContext); // Obtener el usuario del contexto
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Asegúrate de que el UID del usuario esté disponible
        const userId = user?.uid;

        if (!userId) {
          throw new Error('ID de usuario no encontrado.');
        }

        // Realiza la solicitud GET al backend
        const response = await api.get(`/users/${userId}`);
        setUserData(response.data.user); // Asigna los datos del usuario al estado
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        if (error.response && error.response.status === 401) {
          alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
          navigate('/login');
        }
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, navigate]);

  if (!userData) {
    return <div className="text-center mt-10">Cargando datos del usuario...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Mi Perfil</h2>
        <div className="bg-gray-800 p-6 rounded shadow-md">
          <p className="mb-2">
            <strong>Nombre:</strong> {userData.name || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Apellido:</strong> {userData.lastname || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>ID Universitario:</strong> {userData.iduni || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Contacto:</strong> {userData.contact || 'No disponible'}
          </p>
          {userData.photo && (
            <div className="mb-2">
              <strong>Foto de Perfil:</strong>
              <img
                src={userData.photo}
                alt="Foto de Perfil"
                className="w-32 h-32 rounded-full mt-2 border-2 border-gray-500"
              />
            </div>
          )}
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
      <Footer />
    </div>
  );
};

export default Profile;
