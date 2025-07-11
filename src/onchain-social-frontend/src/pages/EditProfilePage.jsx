import React, { useState } from "react";
import "./EditProfilePage.css";

const EditProfilePage = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔔 Simulate Save
    console.log("Profile Saved ✅", {
      username,
      avatar,
      bio,
    });

    // 🎉 Simple alert
    alert("Profile updated successfully!");

    // 💡 Future: backendActor.updateProfile(username, avatar, bio)
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <label>
            Username:
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </label>
          <label>
            Avatar URL:
            <input
              required
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Paste image URL"
            />
          </label>
          <label>
            Bio:
            <textarea
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write your bio..."
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
