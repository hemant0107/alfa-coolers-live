import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAV-xzslScrnEkgzqhn5M8Nx1VGElcmA3M",
  authDomain: "alfacooler01.firebaseapp.com",
  projectId: "alfacooler01",
  storageBucket: "alfacooler01.firebasestorage.app",
  messagingSenderId: "377392789078",
  appId: "1:377392789078:web:3387b441d1add87c0b6df7",
  measurementId: "G-0L9VEQE163"
};

// Initialize Firebase safely (prevents duplicate app initialization error during hot-reloads)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;