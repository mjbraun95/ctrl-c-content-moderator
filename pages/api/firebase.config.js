// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCudZCji9AujnPzv2osAam03QSrRW6hHak",
  authDomain: "ctrl-c-hacked2024.firebaseapp.com",
  projectId: "ctrl-c-hacked2024",
  storageBucket: "ctrl-c-hacked2024.appspot.com",
  messagingSenderId: "690458759354",
  appId: "1:690458759354:web:d0c757bb20e8901f37f283",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if already initialized, use that one
}
export const db = getFirestore(app);
export const auth = getAuth(app);
