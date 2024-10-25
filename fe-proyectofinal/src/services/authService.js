import axios from 'axios';

const API_URL = 'https://proyecto-final-be-s-a-n-t-i-a-g-o-2.vercel.app';

const register = async (userData) => {
  const formData = new FormData();
  formData.append('nombre', userData.nombre);
  formData.append('apellido', userData.apellido);
  formData.append('universidadID', userData.universidadID);
  formData.append('email', userData.email);
  formData.append('password', userData.password);
  formData.append('contacto', userData.contacto);
  if (userData.foto) {
    formData.append('foto', userData.foto);
  }

  return await axios.post(`${API_URL}/register`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const login = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

export default { register, login };
