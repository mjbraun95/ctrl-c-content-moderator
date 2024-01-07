// firebase-auth.js
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.config'

// Function to sign in with email and password
export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
