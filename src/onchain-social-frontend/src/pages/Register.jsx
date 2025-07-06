import React, { useState } from "react";
import "./Register.css";

function Register() {
const [username, setUsername] = useState("");
const [bio, setBio] = useState("");
const [avatarUrl, setAvatarUrl] = useState("");

const handleRegister = async () => {
try {
// @ts-ignore
const result = await window.canister.onchain_social_backend.register_user(username, avatarUrl, bio);
alert("User registered successfully!");
} catch (error) {
console.error("Registration failed:", error);
alert("Registration failed. Check console.");
}
};

return (
<div className="register-container">
<h2>User Registration</h2>
<input
type="text"
placeholder="Username"
value={username}
onChange={(e) => setUsername(e.target.value)}
/>
<input
type="text"
placeholder="Avatar URL"
value={avatarUrl}
onChange={(e) => setAvatarUrl(e.target.value)}
/>
<textarea
placeholder="Bio"
value={bio}
onChange={(e) => setBio(e.target.value)}
/>
<button onClick={handleRegister}>Register</button>
</div>
);
}

export default Register;

