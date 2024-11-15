import { useState } from 'react';
import authService from '../services/authService';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Alterna entre login y registro
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    universidadID: '',
    email: '',
    password: '',
    contacto: '',
    foto: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await authService.login(formData.email, formData.password);
      } else {
        await authService.register(formData);
      }
      // Redirigir o manejar post-login/registro
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-white text-center">DESKPINCHADOS</h1>
        <h2 className="text-lime-400 text-center mb-4">Tu app de transporte universitario</h2>

        <div className="flex justify-between mb-4">
          <button
            className={`w-1/2 p-2 text-center ${isLogin ? 'bg-lime-500' : 'bg-gray-600'} text-white`}
            onClick={() => setIsLogin(true)}
          >
            Inicia Sesión
          </button>
          <button
            className={`w-1/2 p-2 text-center ${!isLogin ? 'bg-lime-500' : 'bg-gray-600'} text-white`}
            onClick={() => setIsLogin(false)}
          >
            Regístrate
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
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
                type="text"
                name="contacto"
                placeholder="Número de contacto"
                className="w-full mb-4 p-2 text-gray-900 rounded"
                value={formData.contacto}
                onChange={handleChange}
              />
            </>
          )}

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
            className="w-full bg-lime-500 p-2 text-white rounded hover:bg-lime-400"
          >
            {isLogin ? 'Inicia Sesión' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
