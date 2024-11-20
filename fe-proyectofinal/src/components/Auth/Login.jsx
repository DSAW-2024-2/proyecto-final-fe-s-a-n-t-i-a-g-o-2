import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Deskpinchados-8-10-2024.png'; // Ruta relativa del logo
import fondo from '../../assets/WhatsApp Image 2024-10-24 at 22.52.36_36367a8d.jpg'; // Ruta relativa del fondo

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
    // El redireccionamiento se maneja dentro del método `login`
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md bg-black bg-opacity-75 p-8 rounded shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Deskpinchados" className="w-64" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Inicia Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          ¿No tienes una cuenta?{' '}
          <span
            className="text-green-500 cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
