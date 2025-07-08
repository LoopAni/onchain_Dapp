import "./FeedPage.css";
import { useState } from "react";

function FeedPage() {
  const [storyFile, setStoryFile] = useState(null);
  const [storyPreview, setStoryPreview] = useState("");
  const [stories, setStories] = useState([
    { id: 1, name: "muskan", img: "https://i.pravatar.cc/60?img=10" },
    { id: 2, name: "anisha", img: "https://i.pravatar.cc/60?img=20" },
    { id: 3, name: "loopani", img: "https://i.pravatar.cc/60?img=30" },
  ]);

  const [postFile, setPostFile] = useState(null);
  const [postCaption, setPostCaption] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "muskan",
      avatar: "https://i.pravatar.cc/40?img=10",
      image: "https://picsum.photos/id/1015/400/300",
      caption: "Peaceful mornings near the mountains 🌄✨",
    },
    {
      id: 2,
      username: "anisha",
      avatar: "https://i.pravatar.cc/40?img=20",
      image: "https://picsum.photos/id/1025/400/300",
      caption: "My furry best friend 🐶❤️ #weekendvibes",
    },
    {
      id: 3,
      username: "loopani",
      avatar: "https://i.pravatar.cc/40?img=30",
      image: "https://picsum.photos/id/1035/400/300",
      caption: "Lost in nature 🍃 Walking through the woods.",
    },
  ]);

  const handleStoryUpload = () => {
    if (storyFile) {
      const newStory = {
        id: Date.now(),
        name: "you",
        img: URL.createObjectURL(storyFile),
      };
      setStories([newStory, ...stories]);
      setStoryFile(null);
      setStoryPreview("");
    }
  };

  const handlePostUpload = () => {
    if (postFile && postCaption) {
      const newPost = {
        id: Date.now(),
        username: "you",
        avatar: "https://i.pravatar.cc/40?img=1",
        image: URL.createObjectURL(postFile),
        caption: postCaption,
      };
      setPosts([newPost, ...posts]);
      setPostFile(null);
      setPostCaption("");
    }
  };

  return (
    <div className="feed-container">
      <div className="feed-box">
        {/* Top Bar with Dummy Logo */}
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

        {/* Story Upload */}
        <div className="upload-section">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setStoryFile(e.target.files[0])}
          />
          <button onClick={handleStoryUpload}>Share Story</button>
        </div>

        {/* Stories */}
        <div className="story-section">
          {stories.map((story) => (
            <div key={story.id} className="story-box">
              <img src={story.img} className="story" alt={story.name} />
              <p className="story-name">@{story.name}</p>
            </div>
          ))}
        </div>

        {/* Post Upload */}
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPostFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Write a caption..."
            value={postCaption}
            onChange={(e) => setPostCaption(e.target.value)}
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
            <img src={post.image} className="post-img" alt="post" />
            <div className="post-actions">
              <i className="fas fa-heart icon"></i>
              <i className="fas fa-comment icon"></i>
              <i className="fas fa-bookmark icon"></i>
            </div>
            <div className="caption">{post.caption}</div>
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
