// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCudZCji9AujnPzv2osAam03QSrRW6hHak",
  authDomain: "ctrl-c-hacked2024.firebaseapp.com",
  projectId: "ctrl-c-hacked2024",
  storageBucket: "ctrl-c-hacked2024.appspot.com",
  messagingSenderId: "690458759354",
  appId: "1:690458759354:web:588249b7c574e7ea37f283",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db  , auth };
