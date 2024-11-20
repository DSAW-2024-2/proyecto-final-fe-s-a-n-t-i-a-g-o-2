import React, { useContext, useEffect } from 'react';
import Header from '../Header';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import api from '../../services/api';
import fondo from '../../assets/WhatsApp Image 2024-10-24 at 22.52.36_36367a8d.jpg'; // Ruta relativa del fondo

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

    if (user) {
      fetchUserData();
    }
  }, [user, setUser, navigate]);

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
        <h2 className="text-3xl font-bold mb-6 text-center text-green-500">
          Mi Perfil
        </h2>
        <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <p className="mb-4 text-lg">
            <strong className="text-green-500">Nombre:</strong> {user.name}
          </p>
          <p className="mb-4 text-lg">
            <strong className="text-green-500">Apellido:</strong> {user.lastname}
          </p>
          <p className="mb-4 text-lg">
            <strong className="text-green-500">Correo Electrónico:</strong> {user.email}
          </p>
          <p className="mb-4 text-lg">
            <strong className="text-green-500">Número de Contacto:</strong> {user.contact}
          </p>
          <p className="mb-4 text-lg">
            <strong className="text-green-500">ID Universidad:</strong> {user.iduni}
          </p>
          {user.photo && (
            <div className="mb-6 text-center">
              <strong className="block text-green-500">Foto de Perfil:</strong>
              <img
                src={user.photo}
                alt="Foto de Perfil"
                className="w-32 h-32 rounded-full mt-4 border-4 border-green-500 mx-auto"
              />
            </div>
          )}
          <div className="mt-6 flex flex-col items-center space-y-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full max-w-xs"
              onClick={() => navigate('/edit-profile')}
            >
              Editar Perfil
            </button>
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 w-full max-w-xs"
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
