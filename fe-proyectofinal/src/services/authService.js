// src/services/authService.js
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';

const API_URL = 'https://proyecto-final-be-s-a-n-t-i-a-g-o-2.vercel.app';



const register = async (userData) => {
  const { email, password, nombre, apellido, universidadID, contacto } = userData;

  try {
    // Crear un nuevo usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar datos adicionales del usuario en Firestore
    await setDoc(doc(db, 'conductores', user.uid), {
      nombre,
      apellido,
      universidadID,
      contacto,
      correoCorporativo: email,
      uid: user.uid,
    });

    return user;
  } catch (error) {
    console.error('Error al registrar:', error);
    throw error;
  }
};

const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data; // Devuelve los datos del usuario o el token
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error;
    }
  };
  

export default { register, login };