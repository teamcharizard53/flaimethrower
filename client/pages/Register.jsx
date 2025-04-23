// Import React and useState for managing local state
import React, { useState } from 'react';
// Import useNavigate to navigate to another page
import { useNavigate } from 'react-router-dom';
// Import css for the register page
import './Register.css';

function Register() {
  // State to store the username entered by the user
  const [username, setUsername] = useState('');

  // Hook to programmatically navigate to another route
  const navigate = useNavigate();

  // Function that runs when the user clicks the "Register" button
  const handleRegister = () => {
    // Validate that the username is not just empty or spaces
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }

    // Save the username to localStorage for session persistence
    localStorage.setItem('flaimethrower_username', username.trim());

    // Navigate to the dashboard page
    navigate('/dashboard');
  };

  return (
    // Wrapper for the register UI
    <div className="register-container">
      {/* App title */}
      <h1>🔥 Flaimethrower Register</h1>

      {/* Input for choosing a username */}
      <input
        type="text"                              // Text input
        placeholder="Choose a username"          // Placeholder shown inside the input
        value={username}                         // Bind to username state
        onChange={(e) => setUsername(e.target.value)} // Update state when user types
      />

      {/* Button to submit the registration */}
      <button onClick={handleRegister}>Register</button>

      {/* Optional: Add a link to the login page if user already has an account */}
      <p>
        Already have an account? <a href="/">Login here</a>
      </p>
    </div>
  );
}

// Export the component to use it in routing
export default Register;
