import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Deskpinchados-8-10-2024.png'; // Ruta relativa del logo
import fondo from '../../assets/WhatsApp Image 2024-10-24 at 22.52.36_36367a8d.jpg'; // Ruta relativa del fondo

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    iduni: '',
    email: '',
    contact: '',
    password: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('lastname', formData.lastname);
    data.append('iduni', formData.iduni);
    data.append('email', formData.email);
    data.append('contact', formData.contact);
    data.append('password', formData.password);
    data.append('photo', formData.photo);

    try {
      await api.post('/users/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error al registrar. Por favor, intenta de nuevo.');
      }
    }
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
      <div className="w-full max-w-2xl bg-black bg-opacity-75 p-8 rounded shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Deskpinchados" className="w-64" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Registro de Pasajero
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div>
              <label className="block text-gray-300">Apellido</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                placeholder="Ingresa tu apellido"
              />
            </div>
            <div>
              <label className="block text-gray-300">ID Universidad</label>
              <input
                type="text"
                name="iduni"
                value={formData.iduni}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                placeholder="Ingresa tu ID Universidad"
              />
            </div>
            <div>
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
            <div>
              <label className="block text-gray-300">Número de Contacto</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                placeholder="Ingresa tu número de contacto"
              />
            </div>
            <div>
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
          </div>
          <div className="mt-4">
            <label className="block text-gray-300">Foto de Perfil (Opcional)</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
              accept="image/*"
            />
          </div>
          <div className="flex mt-6">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
