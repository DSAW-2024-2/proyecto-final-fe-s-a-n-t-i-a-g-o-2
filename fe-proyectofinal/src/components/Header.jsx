// src/components/Header.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/main-menu" className="text-2xl font-bold">Deskpinchados</Link>
      <nav>
        <Link to="/profile" className="mr-4">Mi Perfil</Link>
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      </nav>
    </header>
  );
};

export default Header;
