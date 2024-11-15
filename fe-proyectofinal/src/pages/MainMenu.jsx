import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const MainMenu = ({ user }) => {
  const navigate = useNavigate();
  const [isPassenger, setIsPassenger] = useState(true); // Estado para el switch
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Obtener el nombre del usuario (asumiendo que está en `user` o `localStorage`)
    if (user) {
      setUserName(user.nombre);
    } else {
      // Aquí podrías hacer una solicitud al backend si no tienes el usuario en el estado
      setUserName(localStorage.getItem('userName') || 'Usuario');
    }
  }, [user]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center bg-black min-h-screen p-4 text-white">
      {/* Logo y botón de perfil */}
      <div className="flex items-center justify-between w-full mb-8">
        <img src="/path-to-logo.png" alt="Deskpinchados Logo" className="h-10" />
        <div className="relative">
          <button className="bg-green-600 p-2 rounded-lg hover:bg-green-500">
            Mi perfil
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
            <button
              onClick={() => navigate('/profile')}
              className="block w-full text-left p-2 hover:bg-gray-700"
            >
              Gestionar mi perfil
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left p-2 hover:bg-gray-700"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Mensaje de bienvenida y switch */}
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {userName}!</h1>
      <div className="flex items-center mb-6">
        <label className="mr-2">Pasajero</label>
        <input
          type="checkbox"
          checked={isPassenger}
          onChange={() => setIsPassenger(!isPassenger)}
          className="toggle-checkbox"
        />
        <label className="ml-2">Conductor</label>
      </div>

      {/* Filtros */}
      <div className="flex space-x-4 mb-8">
        <input
          type="text"
          placeholder="Filtrar por cupo"
          className="p-2 bg-gray-700 rounded w-1/2"
        />
        <input
          type="text"
          placeholder="Filtrar por salida"
          className="p-2 bg-gray-700 rounded w-1/2"
        />
      </div>

      {/* Viajes Disponibles (futuro) */}
      <h2 className="text-2xl font-bold mb-4">Viajes Disponibles</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Aquí se agregarán los viajes disponibles en el futuro */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-md text-center">
          Ejemplo de viaje disponible
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
