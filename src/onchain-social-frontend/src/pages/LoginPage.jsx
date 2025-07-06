import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { onchain_social_backend } from "../../../declarations/onchain-social-backend";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
const navigate = useNavigate();
const [username, setUsername] = useState("");

// Check backend connection when component mounts
useEffect(() => {
onchain_social_backend.get_user()
.then((user) => {
console.log("Connected to backend, got user:", user);
})
.catch((err) => {
console.error("Failed to connect to backend:", err);
});
}, []);

const handleLogin = async (e) => {
e.preventDefault();
try {
const user = await onchain_social_backend.get_user();
if (user.username === username) {
navigate("/profile");
} else {
alert("User not found. Please register.");
}
} catch (err) {
console.error("Login failed:", err);
alert("Login failed");
}
};

return (
<div className="auth-container">
<div className="auth-card">
<h2>Login</h2>
<form className="auth-form" onSubmit={handleLogin}>
<input
type="text"
placeholder="Username"
required
value={username}
onChange={(e) => setUsername(e.target.value)}
/>
<button type="submit">Login</button>
</form>
<p>
Don't have an account? <a href="/register">Sign Up</a>
</p>
</div>
</div>
);
}