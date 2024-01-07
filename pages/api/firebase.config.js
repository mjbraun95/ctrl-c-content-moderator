// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtlnfLchmkW2R4RwEa0zaJtCe9mKi_UbU",
  authDomain: "ctrl-c-hacked2024-2.firebaseapp.com",
  projectId: "ctrl-c-hacked2024-2",
  storageBucket: "ctrl-c-hacked2024-2.appspot.com",
  messagingSenderId: "736612628562",
  appId: "1:736612628562:web:0e76e3564a0d4a2344478b",
  measurementId: "G-XC997FZKYF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
