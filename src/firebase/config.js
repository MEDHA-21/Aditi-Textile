import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnkAPw3cchBSyh9PDt6Mvdr5YyeW88U0Y",
    authDomain: "aditi-textile.firebaseapp.com",
    projectId: "aditi-textile",
    storageBucket: "aditi-textile.firebasestorage.app",
    messagingSenderId: "489420384413",
    appId: "1:489420384413:web:ee0dbbfece1ab31276cc74",
    measurementId: "G-EW98KE7HDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
