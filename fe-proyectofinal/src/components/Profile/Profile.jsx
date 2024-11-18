// src/components/Profile/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user || !user.uid) {
          throw new Error('Usuario no autenticado o UID no disponible.');
        }

        const userId = user.uid;
        console.log('Obteniendo datos del usuario con UID:', userId);

        // Realizamos la solicitud GET al backend para obtener los datos del usuario
        const response = await api.get(`/users/${userId}`);
        console.log('Datos del usuario recibidos:', response.data);

        if (!response.data || !response.data.name) {
          throw new Error('Datos del usuario inválidos recibidos.');
        }

        setUserData(response.data); // Asignamos los datos al estado
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        if (error.response && error.response.status === 401) {
          alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
          navigate('/login');
        } else if (error.response && error.response.status === 404) {
          alert('Usuario no encontrado.');
        } else {
          alert('Ocurrió un error al obtener los datos del usuario.');
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
            <strong>Correo Electrónico:</strong> {userData.email || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>Número de Contacto:</strong> {userData.contact || 'No disponible'}
          </p>
          <p className="mb-2">
            <strong>ID Universidad:</strong> {userData.iduni || 'No disponible'}
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
