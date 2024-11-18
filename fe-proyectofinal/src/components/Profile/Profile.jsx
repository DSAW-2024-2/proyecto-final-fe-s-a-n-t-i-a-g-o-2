// src/components/Profile/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import api from '../../services/api';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Verificamos que el 'uid' está disponible
        const userId = user.uid || user.id || user._id;
        if (!userId) {
          throw new Error('ID de usuario no encontrado.');
        }

        // Obtener la información actualizada del usuario
        const response = await api.get(`/users/${userId}`);
        setUserData(response.data.user);
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
        const userId = user.uid || user.id || user._id;
        if (!userId) {
          throw new Error('ID de usuario no encontrado.');
        }

        const response = await api.get(`/cars/${userId}`);
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
  }, [user, navigate]);

  if (!userData) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Mi Perfil</h2>
        <div className="bg-gray-800 p-6 rounded shadow-md">
          <p className="mb-2">
            <strong>Nombre:</strong> {userData.name}
          </p>
          <p className="mb-2">
            <strong>Apellido:</strong> {userData.lastname}
          </p>
          <p className="mb-2">
            <strong>Correo Electrónico:</strong> {userData.email}
          </p>
          <p className="mb-2">
            <strong>Número de Contacto:</strong> {userData.contact}
          </p>
          <p className="mb-2">
            <strong>ID Universidad:</strong> {userData.iduni}
          </p>
          {userData.photo && (
            <div className="mb-2">
              <strong>Foto de Perfil:</strong>
              <img src={userData.photo} alt="Foto de Perfil" className="w-32 h-32 rounded-full mt-2" />
            </div>
          )}
          {/* Información del Vehículo */}
          {car && (
            <>
              <h3 className="text-xl font-bold mt-6 mb-4">Información del Vehículo</h3>
              <p className="mb-2">
                <strong>Placa:</strong> {car.placa}
              </p>
              <p className="mb-2">
                <strong>Marca:</strong> {car.marca}
              </p>
              <p className="mb-2">
                <strong>Modelo:</strong> {car.modelo}
              </p>
              <p className="mb-2">
                <strong>Capacidad:</strong> {car.capacidad}
              </p>
              <p className="mb-2">
                <strong>Tipo de Vehículo:</strong> {car.carro}
              </p>
              {car.soat && (
                <div className="mb-2">
                  <strong>Foto del SOAT:</strong>
                  <img src={car.soat} alt="Foto del SOAT" className="w-32 h-32 rounded mt-2" />
                </div>
              )}
            </>
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
