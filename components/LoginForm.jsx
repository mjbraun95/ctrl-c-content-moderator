import React, { useState } from 'react';
import {auth} from '../pages/api/firebase.config'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useRouter } from 'next/router'

function LoginForm() {
  // Initialize state for username and password
  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User signed in - userCredential.user will have the signed-in user info
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard')
      
    } catch (error) {
      // Handle Errors here
      setError(error.message);
      console.error('Error signing in:', error.code, error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card custom-border rounded-0 border-3 border-black" style={{ width: '22rem' }}>
        <div className="card-body">
          <h1 className="card-title text-center mb-5">The Ban Hammer</h1>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control rounded-0 border-black border-2"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control rounded-0 border-black border-2"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-dark btn-lg rounded-0 border-black border-2">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
