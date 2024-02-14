// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAQjlwhuwWYJ-OdhhPP4XRxEgWSfQ5d3-o",
  authDomain: "ali-raza-518df.firebaseapp.com",
  databaseURL: "https://ali-raza-518df-default-rtdb.firebaseio.com",
  projectId: "ali-raza-518df",
  storageBucket: "ali-raza-518df.appspot.com",
  messagingSenderId: "308309137877",
  appId: "1:308309137877:web:ac0be37dd3c2bb9544055c",
  measurementId: "G-82NM2JZS9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);
