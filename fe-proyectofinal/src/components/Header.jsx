import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import logo from '../assets/Deskpinchados-8-10-2024.png'; // Ruta del logo

const Header = () => {
  const { logout } = useContext(AuthContext);

  return (
    <header className="bg-black bg-opacity-90 text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo con enlace al menú principal */}
      <Link to="/main-menu" className="flex items-center">
        <img src={logo} alt="Deskpinchados" className="h-12" />
      </Link>

      {/* Navegación */}
      <nav className="flex items-center space-x-6">
        <Link
          to="/profile"
          className="text-green-500 hover:text-green-600 font-bold"
        >
          Mi Perfil
        </Link>
        <Link
          to="/vehicle"
          className="text-green-500 hover:text-green-600 font-bold"
        >
          Mi Vehículo
        </Link>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
