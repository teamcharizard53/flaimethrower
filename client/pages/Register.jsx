import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      alert('Please enter a username and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uname: username.trim(), pword: password.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('flaimethrower_username', username.trim());
        navigate(`/dashboard/${data}`);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  return (
    <div className="register-container">
      <h1>🔥 Flaimethrower Register</h1>

      <input
        type="text"
        placeholder="Choose a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Choose a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      <p>
        Already have an account? <a href="/">Login here</a>
      </p>
    </div>
  );
}

export default Register;
