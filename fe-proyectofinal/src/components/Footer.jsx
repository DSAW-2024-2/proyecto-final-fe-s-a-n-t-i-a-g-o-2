import React from 'react';

const Footer = () => {
  return (
    <footer
      className="bg-black bg-opacity-90 text-gray-400 p-4 text-center shadow-inner"
    >
      <p>
        © {new Date().getFullYear()} <span className="text-green-500">Deskpinchados</span>. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
