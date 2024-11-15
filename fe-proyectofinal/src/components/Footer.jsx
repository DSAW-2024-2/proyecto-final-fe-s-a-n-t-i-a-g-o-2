// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>© {new Date().getFullYear()} Deskpinchados. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
