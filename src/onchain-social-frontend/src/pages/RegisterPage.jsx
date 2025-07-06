import React, { useState } from "react";
import { onchain_social_backend } from "../../../declarations/onchain-social-backend";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onchain_social_backend.register_user(username, "", bio);
      setMessage("User registered successfully!");
    } catch (err) {
      setMessage("Registration failed: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
        {message && <p>{message}</p>}
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}
