import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      localStorage.setItem("session_id", username);
      // Here you would typically also send the data to your backend for registration
      navigate("/home");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="SignUp-Wrapper">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignUp}>
          <h2 className="signup-title">Create Account</h2>
          <label htmlFor="username" className="signup-label">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password" className="signup-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword" className="signup-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;