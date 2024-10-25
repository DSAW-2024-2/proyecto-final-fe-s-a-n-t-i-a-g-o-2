import axios from 'axios';

const API_URL = 'http://localhost:3000';

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

export default { register };
