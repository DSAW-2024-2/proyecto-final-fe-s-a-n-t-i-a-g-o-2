import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(formData.email, formData.password);
      setSuccess('Inicio de sesión exitoso'); 
      setError('');
      setTimeout(() => {
        navigate('/main', { state: { user: response.user } }); // Redirige al menú principal con los datos del usuario
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error en el inicio de sesión');
      setSuccess('');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <form
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-4 text-white text-center">Inicia Sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
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
        <button
          type="submit"
          className="w-full bg-green-600 p-2 text-white rounded hover:bg-green-500"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
