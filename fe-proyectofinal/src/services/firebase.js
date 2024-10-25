// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBn3OsHbdnZKZ2kIb6xRSvPVKSJ4aOAfZ4",
    authDomain: "proyecto-final-web-santiago-2.firebaseapp.com",
    projectId: "proyecto-final-web-santiago-2",
    storageBucket: "proyecto-final-web-santiago-2.appspot.com",
    messagingSenderId: "769235505581",
    appId: "1:769235505581:web:ac1aeeecfc12ce8b55d124",
    measurementId: "G-5QFFW7HE3X"
    };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
