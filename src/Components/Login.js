import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[username] && users[username] === password) {
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="Login-Wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-title">Login</h2>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          <label htmlFor="username" className="login-label">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password" className="login-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
          <br />
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="login-button"
            style={{ marginTop: "10px" }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;