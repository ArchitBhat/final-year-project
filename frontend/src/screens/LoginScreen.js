import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/login', { identifier, password });
      localStorage.setItem('token', res.data.token);
      navigate('/book-room');
    } catch {
      setError('Invalid username or password');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title fw-bold text-blue fs-2">Gold Castle Lodge</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="mb-3">
            <label className="form-label fw-bold text-white">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 position-relative">
            <label className="form-label fw-bold text-white">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control password-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} toggle-password-icon`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-primary" type="submit">Login</button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={handleRegisterClick}
            >
              Don't have an account? Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
