import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgRF6hP_p4YVXdO1z4a3FQmYdjbvkIOuk",
    authDomain: "vijay-tent.firebaseapp.com",
    projectId: "vijay-tent",
    storageBucket: "vijay-tent.firebasestorage.app",
    messagingSenderId: "326719832048",
    appId: "1:326719832048:web:5f27a0e081c745f45fe735",
    measurementId: "G-N2SND678W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
