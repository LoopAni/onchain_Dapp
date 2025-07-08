import "./EditProfilePage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {
  const [username, setUsername] = useState("muskan");
  const [email, setEmail] = useState("muskan@example.com");
  const [profilePic, setProfilePic] = useState("https://i.imgur.com/placeholder.png");
  const [bio, setBio] = useState("Aspiring blockchain developer ✨");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Later: send this data to backend or save in localStorage
    console.log("Profile Updated:", { username, email, profilePic, bio });

    // ✅ Automatically redirect to Feed Page after saving
    navigate("/feed");
  };

  return (
    <div className="edit-container">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>

        <input
          type="text"
          value={username}
          placeholder="Username"
          className="edit-input"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          value={email}
          placeholder="Email"
          className="edit-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          value={profilePic}
          placeholder="Profile Picture URL"
          className="edit-input"
          onChange={(e) => setProfilePic(e.target.value)}
        />

        {/* Live Image Preview */}
        <img src={profilePic} alt="Profile Preview" className="profile-preview" />

        <textarea
          value={bio}
          placeholder="Write a short bio..."
          className="edit-textarea"
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />

        <button type="submit" className="edit-button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfilePage;
