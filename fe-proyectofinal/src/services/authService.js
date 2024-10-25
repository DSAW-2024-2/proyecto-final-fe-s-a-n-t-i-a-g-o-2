// src/services/authService.js
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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
  return await createUserWithEmailAndPassword(auth, email, password);
};

export default { register, login };
