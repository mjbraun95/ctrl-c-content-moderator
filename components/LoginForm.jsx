import React, { useState } from 'react';
import   signInWithEmail  from '../pages/api/firebaseSignin'

function LoginForm() {
  // Initialize state for username and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmail(email, password);
      // User signed in - userCredential.user will have the signed-in user info
      console.log('User signed in:', userCredential.user);
    } catch (error) {
      // Handle Errors here
      setError(error.message);
      console.error('Error signing in:', error.code, error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card" style={{ width: '22rem' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login to Your Account</h3>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
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
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg">Login</button>
            </div>
          </form>
          <div className="text-center mt-3">
            <a href="/register" className="link-primary">Register</a> - <a href="/forgot-password" className="link-primary">Forgot Password</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
