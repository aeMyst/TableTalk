import React, { useState } from "react";
import { useParams } from "react-router-dom";
import blogPosts from "../database/blogData.jsx";
import "./Posts.css";

export default function Posts() {
  const { id } = useParams();
  const post = blogPosts.find((p) => String(p.id) === id);

  const [replies, setReplies] = useState(post?.replies || []);
  const [newReply, setNewReply] = useState("");
  const [likes, setLikes] = useState(post?.likes || 0);
  const [liked, setLiked] = useState(false); 

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>404 - Post Not Found</h2>
        <p>Sorry, we couldn’t find that blog post.</p>
      </div>
    );
  }

  const handleAddReply = () => {
    if (newReply.trim() === "") return;

    const newEntry = {
      id: replies.length + 1,
      user: "You",
      text: newReply.trim(),
    };

    setReplies([...replies, newEntry]);
    setNewReply("");
  };

  const handleToggleLike = () => {
    setLiked((prevLiked) => {
      const updated = !prevLiked;
      setLikes((prev) => prev + (updated ? 1 : -1));
      return updated;
    });
  };

  return (
    <div className="post-container">
      <div className="post-content-wrapper">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-author">By {post.author}</span>
          <span className="post-date">{post.date}</span>
        </div>
        <hr className="post-divider" />

        <div className="post-content">
          <p>{post.content}</p>
        </div>

        {/* Replies Section */}
        <div className="replies-section">
            
        <div className="like-section">
          <button className="like-button" onClick={handleToggleLike}>
            {liked ? "❤️" : "🤍"}
          </button>
          <span className="like-count">{likes} {likes === 1 ? "Like" : "Likes"}</span>
        </div>

          <h3 className="replies-heading">Replies</h3>
          {replies.length === 0 ? (
            <p className="no-replies">No replies yet. Be the first to reply!</p>
          ) : (
            <ul className="replies-list">
              {replies.map((reply) => (
                <li key={reply.id} className="reply-item">
                  <strong>{reply.user}:</strong> {reply.text}
                </li>
              ))}
            </ul>
          )}

          <div className="reply-form">
            <textarea
              className="reply-textarea"
              placeholder="Write your reply..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
            />
            <button className="reply-button" onClick={handleAddReply}>
              Submit Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
