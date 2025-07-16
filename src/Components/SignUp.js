import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[username]) {
      setError("Username already exists");
      return;
    }
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
      navigate("/home");
  };

  return (
    <div className="Login-Wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSignUp}>
          <h2 className="login-title">Sign Up</h2>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          <label htmlFor="signup-username" className="login-label">Username</label>
          <input
            id="signup-username"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="signup-password" className="login-label">Password</label>
          <input
            id="signup-password"
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="signup-confirm-password" className="login-label">Confirm Password</label>
          <input
            id="signup-confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;