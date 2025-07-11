import "./FeedPage.css";
import { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";

function FeedPage() {
  const [postContent, setPostContent] = useState("");
  const [visibility, setVisibility] = useState("public");

  const [profile, setProfile] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});

  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "muskan",
      avatar: "https://i.pravatar.cc/40?img=10",
      content: "Just launched my on-chain social app! 🚀 #web3",
      likes: ["you"],
      timestamp: new Date().toISOString(),
      comments: [],
      visible: true,
      author: "muskan",
    },
    {
      id: 2,
      username: "anisha",
      avatar: "https://i.pravatar.cc/40?img=20",
      content: "Coffee + code = ❤️",
      likes: [],
      timestamp: new Date().toISOString(),
      comments: [],
      visible: true,
      author: "anisha",
    },
  ]);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");

  // Search & Follow logic
const [search, setSearch] = useState("");
const [showDropdown, setShowDropdown] = useState(false);
const [users, setUsers] = useState([]);

useEffect(() => {
  const hardcodedUsers = [
    {
      id: "1",
      username: "muskan",
      avatar: "https://i.pravatar.cc/100?img=10",
      isFollowing: false,
    },
    {
      id: "2",
      username: "anisha",
      avatar: "https://i.pravatar.cc/100?img=20",
      isFollowing: false,
    },
    {
      id: "3",
      username: "loopani",
      avatar: "https://i.pravatar.cc/100?img=30",
      isFollowing: false,
    },
  ];

  const profiles = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("profile:")) {
      const profile = JSON.parse(localStorage.getItem(key));
      const exists = hardcodedUsers.find(
        (u) => u.username.toLowerCase() === profile.username.toLowerCase()
      );
      if (!exists) {
        profiles.push({
          id: key,
          username: profile.username,
          avatar: profile.avatarUrl || "https://i.ibb.co/Pr3bY4X/default-avatar.png",
          isFollowing: false,
        });
      }
    }
  }

  setUsers([...hardcodedUsers, ...profiles]);
}, []);

const toggleFollow = (id) => {
  setUsers((prevUsers) =>
    prevUsers.map((u) =>
      u.id === id ? { ...u, isFollowing: !u.isFollowing } : u
    )
  );
};

const filteredUsers = users.filter((user) =>
  user.username.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
    const loadProfile = async () => {
      try {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      const userPrincipal = identity.getPrincipal().toText();
      setPrincipal(userPrincipal);
      const storedProfile = localStorage.getItem(`profile:${userPrincipal}`);
  if (storedProfile) {
    const profileData = JSON.parse(storedProfile);
    setProfile(profileData);
  } else {
    alert("⚠️ Profile not found for this user. Redirecting...");
    navigate("/profile-setup");
  }
} catch (error) {
  alert("Error loading profile. Please try again.");
  console.error("Profile Load Error:", error);
}
  };
    loadProfile();
  }, []);

  const handlePostUpload = () => {
    if (postContent.trim()) {
      const newPost = {
      id: Date.now(),
      username: profile.username, // ✅ use actual profile
      avatar: profile.avatarUrl || "https://i.ibb.co/Pr3bY4X/default-avatar.png",
      content: postContent.trim(),
      likes: [],
      timestamp: new Date().toISOString(),
      visible: visibility === "public",
      author: profile.username,
    };
      setPosts([newPost, ...posts]);
      setPostContent("");
    }
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const startEdit = (id, currentContent) => {
    setEditingPostId(id);
    setEditContent(currentContent);
  };

  const handleSaveEdit = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, content: editContent } : post
      )
    );
    setEditingPostId(null);
  };

  const handleToggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const hasLiked = post.likes.includes("you");
          const updatedLikes = hasLiked
            ? post.likes.filter((user) => user !== "you")
            : [...post.likes, "you"];
          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );
  };
  
  const handleCommentSubmit = (postId) => {
  const newComment = commentInputs[postId];
  if (!newComment) return;

  const currentUser = profile?.username || "you";
  const timestamp = Date.now();

  const updatedPosts = posts.map((post) =>
    post.id === postId
      ? {
          ...post,
          comments: [
            ...post.comments,
            {
              commenter: currentUser,
              text: newComment,
              timestamp,
            },
          ],
        }
      : post
  );

  setPosts(updatedPosts);
  setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
};

 const formatTime = (timestamp) => {
    const diff = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="feed-container">
      <div className="feed-box">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="logo">
            <img
              src="https://png.pngtree.com/png-clipart/20240703/original/pngtree-an-app-with-logos-of-various-social-media-icons-vector-png-image_15478072.png"
              alt="Onchain Logo"
              className="logo-img"
            />
            Onchain Social
          </div>
          <div className="icons">
            <i className="fas fa-bell"></i>
            <i className="fas fa-paper-plane"></i>
          </div>
        </div>

      {/* 🔍 Search & Follow Dropdown */}
<div className="search-dropdown">
  <input
    type="text"
    placeholder="Search users"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onFocus={() => setShowDropdown(true)}
    onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay to allow click
    className="search-input"
  />

  {showDropdown && filteredUsers.length > 0 && (
    <div className="dropdown-results">
      {filteredUsers.map((user) => (
        <div key={user.id} className="dropdown-user">
          <img src={user.avatar} alt={user.username} className="dropdown-avatar" />
          <span className="dropdown-username">{user.username}</span>
          <button
            onClick={() => toggleFollow(user.id)}
            className={user.isFollowing ? "unfollow-btn" : "follow-btn"}
          >
            {user.isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  )}
</div>
        {/* Logged in principal info */}
  <p className="info-text" style={{ textAlign: "right", margin: "0 1rem", fontSize: "0.9rem", color: "#ccc" }}>
    Logged in as: {principal}
  </p>

        {/* Post Creation */}
        <div className="upload-section">
          <textarea
            placeholder="Share your thoughts..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={3}
          />
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">🌐 Public</option>
            <option value="private">🔒 Private</option>
          </select>
          <button onClick={handlePostUpload}>Post</button>
        </div>

        {/* Posts */}
        {posts
          .filter((post) => post.visible || post.username === "you")
          .map((post) => (
            <div className="post" key={post.id}>
              <div className="post-header">
                <img src={post.avatar} className="avatar" alt={post.username} />
                <div>
                  <span
                    className="clickable-username"
                    onClick={() => {
                      if (post.username === "you") {
                        window.open("/edit-profile", "_blank");
                      }
                    }}
                  >
                    @{post.username}
                  </span>{" "}
                  ·{" "}
                  <span className="timestamp">{formatTime(post.timestamp)}</span>
                  {!post.visible && (
                    <span className="private-tag">🔒 Private</span>
                  )}
                </div>
              </div>

              <div className="post-actions">
                <button
                  className={`like-button ${
                    post.likes.includes("you") ? "liked" : ""
                  }`}
                  onClick={() => handleToggleLike(post.id)}
                >
                  ❤️ {post.likes.length}
                </button>
              </div>

              {editingPostId === post.id ? (
                <div className="edit-box">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(post.id)}>Save</button>
                  <button onClick={() => setEditingPostId(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <div className="content">{post.content}</div>
                  {post.author === profile?.username && (
                    <div className="post-buttons">
                      <button onClick={() => startEdit(post.id, post.content)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                  )}
                </>
              )}

              <div className="comment-box">
  <input
    type="text"
    placeholder="Add a comment..."
    value={commentInputs[post.id] || ""}
    onChange={(e) =>
      setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
    }
  />
  <button
    className="comment-button"
    onClick={() => handleCommentSubmit(post.id)}
  >
    Post
  </button>

  <div className="comment-list">
    {post.comments?.map((c, idx) => (
      <div key={idx} className="comment-item">
        <strong>@{c.commenter}</strong>: {c.text}
      </div>
    ))}
  </div>
</div>
            </div>
          ))}

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <i className="nav-icon fas fa-home active"></i>
          <i className="nav-icon fas fa-search"></i>
          <i className="nav-icon fas fa-cog"></i>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
