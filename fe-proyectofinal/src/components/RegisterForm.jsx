import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    universidadID: '',
    email: '',
    password: '',
    contacto: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      navigate('/login'); // Redirigir después del registro exitoso
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <form
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-4 text-white text-center">Regístrate</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="w-full mb-4 p-2 text-gray-900 rounded"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          className="w-full mb-4 p-2 text-gray-900 rounded"
          value={formData.apellido}
          onChange={handleChange}
        />
        <input
          type="text"
          name="universidadID"
          placeholder="ID Universidad"
          className="w-full mb-4 p-2 text-gray-900 rounded"
          value={formData.universidadID}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo institucional"
          className="w-full mb-4 p-2 text-gray-900 rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 text-gray-900 rounded"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contacto"
          placeholder="Número de contacto"
          className="w-full mb-4 p-2 text-gray-900 rounded"
          value={formData.contacto}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-green-600 p-2 text-white rounded hover:bg-green-500"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
