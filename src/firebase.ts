import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJgRb6qkrk_NvbbipCOPrYeCHdgFPCaeQ",
    authDomain: "vijay-tent-17baf.firebaseapp.com",
    projectId: "vijay-tent-17baf",
    storageBucket: "vijay-tent-17baf.firebasestorage.app",
    messagingSenderId: "950304591005",
    appId: "1:950304591005:web:9de43e8a0305440fdcd874"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized with project:", firebaseConfig.projectId);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
console.log("Firebase Auth service initialized");

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
