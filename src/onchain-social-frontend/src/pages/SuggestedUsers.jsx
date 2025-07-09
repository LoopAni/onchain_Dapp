import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./SuggestedUsers.css";

function SuggestedUsers() {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "muskan",
      avatar: "https://i.pravatar.cc/100?img=10",
      isFollowing: false,
    },
    {
      id: 2,
      username: "anisha",
      avatar: "https://i.pravatar.cc/100?img=20",
      isFollowing: false,
    },
    {
      id: 3,
      username: "loopani",
      avatar: "https://i.pravatar.cc/100?img=30",
      isFollowing: false,
    },
  ]);

  const toggleFollow = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  return (
    <div className="suggested-container">
      {/* ✅ Back to Feed Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/feed")}
      >
        ← Back to Feed
      </button>

      <h2>Suggested Users</h2>
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.avatar} alt={user.username} className="avatar" />
            <div className="user-info">
              <p className="username">@{user.username}</p>
              <button
                className={`follow-btn ${
                  user.isFollowing ? "unfollow" : "follow"
                }`}
                onClick={() => toggleFollow(user.id)}
              >
                {user.isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedUsers;
