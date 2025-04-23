// Import React and useState to manage local state
import React, { useState } from 'react';
// Import useNavigate from react-router-dom for page navigation
import { useNavigate } from 'react-router-dom';
// Import custom CSS for styling
import './Login.css';

function Login() {
  // Declare a state variable to track the username input
  const [username, setUsername] = useState('');

  // Get navigate function to redirect user to another route
  const navigate = useNavigate();

  // Function triggered when the user clicks the login button
  const handleLogin = () => {
    // If username is empty or only whitespace, show an alert
    if (!username.trim()) {
      alert('Please enter a username');
      return; // Exit the function early
    }

    // Save the trimmed username to localStorage so the session persists
    localStorage.setItem('flaimethrower_username', username.trim());

    // Redirect user to the dashboard (chatroom)
    navigate('/dashboard');
  };

  return (
    // Main container for login UI
    <div className="login-container">
      {/* App title */}
      <h1>🔥 Flaimethrower Login</h1>

      {/* Input field for username */}
      <input
        type="text"                           // Text input
        placeholder="Enter your username"     // Placeholder text
        value={username}                      // Bind to username state
        onChange={(e) => setUsername(e.target.value)} // Update state on input change
      />

      {/* Button to submit login */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

// Export the Login component so it can be used elsewhere
export default Login;
