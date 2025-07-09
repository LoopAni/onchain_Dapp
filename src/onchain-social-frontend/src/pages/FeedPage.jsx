import "./FeedPage.css";
import { useState } from "react";

function FeedPage() {
  const [postCaption, setPostCaption] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "muskan",
      avatar: "https://i.pravatar.cc/40?img=10",
      caption: "Just launched my on-chain social app! 🚀 #web3",
    },
    {
      id: 2,
      username: "anisha",
      avatar: "https://i.pravatar.cc/40?img=20",
      caption: "Coffee + code = ❤️",
    },
  ]);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editCaption, setEditCaption] = useState("");

  // Like logic
  const [likedPosts, setLikedPosts] = useState({});

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Search & Follow logic
  const [search, setSearch] = useState("");
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
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, isFollowing: !u.isFollowing } : u
      )
    );
  };

  const handlePostUpload = () => {
    if (postCaption.trim()) {
      const newPost = {
        id: Date.now(),
        username: "you",
        avatar: "https://i.pravatar.cc/40?img=1",
        caption: postCaption.trim(),
      };
      setPosts([newPost, ...posts]);
      setPostCaption("");
    }
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const startEdit = (id, currentCaption) => {
    setEditingPostId(id);
    setEditCaption(currentCaption);
  };

  const handleSaveEdit = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, caption: editCaption } : post
      )
    );
    setEditingPostId(null);
  };

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="feed-container">
      <div className="feed-box">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="logo">
            <img
              src="https://mintlify.s3.us-west-1.amazonaws.com/base-a060aa97/images/hero.png"
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

        {/* Search Bar */}
        <div className="upload-section">
          <input
            type="text"
            placeholder="Search users to follow..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />

          {search.length > 0 &&
            filteredUsers.map((user) => (
              <div className="user-card" key={user.id}>
                <img src={user.avatar} className="avatar" alt={user.username} />
                <span>@{user.username}</span>
                <button onClick={() => toggleFollow(user.id)}>
                  {user.isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            ))}
        </div>

        {/* Post Creation */}
        <div className="upload-section">
          <textarea
            placeholder="What's happening?"
            value={postCaption}
            onChange={(e) => setPostCaption(e.target.value)}
            rows={3}
          />
          <button onClick={handlePostUpload}>Post</button>
        </div>

        {/* Posts */}
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post-header">
              <img src={post.avatar} className="avatar" alt={post.username} />
              <span>@{post.username}</span>
            </div>

            <div className="post-actions">
              <i
                className={`fas fa-heart icon ${
                  likedPosts[post.id] ? "liked" : ""
                }`}
                onClick={() => toggleLike(post.id)}
              ></i>
            </div>

            {editingPostId === post.id ? (
              <div className="edit-box">
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(post.id)}>Save</button>
                <button onClick={() => setEditingPostId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <div className="caption">{post.caption}</div>
                {post.username === "you" && (
                  <div className="post-buttons">
                    <button onClick={() => startEdit(post.id, post.caption)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                  </div>
                )}
              </>
            )}

            <div className="comment-box">
              <input type="text" placeholder="Add a comment..." />
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
