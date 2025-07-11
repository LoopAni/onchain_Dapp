import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import "./SetupProfile.css"; // CSS import

function SetupProfile() {
const [username, setUsername] = useState("");
const [bio, setBio] = useState("");
const [avatarUrl, setAvatarUrl] = useState("");
const [principal, setPrincipal] = useState(null);
const navigate = useNavigate();

useEffect(() => {
const init = async () => {
const authClient = await AuthClient.create();
const identity = authClient.getIdentity();
const principalText = identity.getPrincipal().toText();
setPrincipal(principalText);
  // 🔧 Future: createActor once backend is integrated
};
init();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();

if (!username.trim() || !bio.trim()) {
  alert("Please fill in all required fields.");
  return;
}

// Simulate backend call
 const profileData = {
    principal,
    username: username.trim(),
    avatarUrl: avatarUrl.trim() || "https://i.ibb.co/Pr3bY4X/default-avatar.png",
    bio: bio.trim(),
};
  

// Simulate saving to backend by saving in localStorage
localStorage.setItem(`profile:${principal}`, JSON.stringify(profileData));

console.log("✅ Profile saved:", profileData);
alert("✅ Profile saved successfully!");
navigate("/feed");
};

return (
<div className="setup-profile-container">
<div className="setup-profile-card">
<h2>Setup Your Profile</h2>
    <p className="info-text">Logged in as: {principal}</p>

    <form onSubmit={handleSubmit} className="setup-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <textarea
        placeholder="Your bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Avatar URL (optional)"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      <button type="submit">Save Profile</button>
    </form>
  </div>
</div>
);
}
export default SetupProfile;