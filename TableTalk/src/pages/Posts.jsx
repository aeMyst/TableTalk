import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import blogPosts from "../database/blogData.jsx";
import "./Posts.css";

export default function Posts() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const post = blogPosts.find((p) => String(p.id) === id);
  const [replies, setReplies] = useState(post?.replies || []);
  const [newReply, setNewReply] = useState("");
  const [likes, setLikes] = useState(post?.likes || 0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>404 - Post Not Found</h2>
        <p>Sorry, we couldn’t find that blog post.</p>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setLikes((prev) => prev + 1);
    } else {
      setLikes((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  const handleAddReply = () => {
    if (!newReply.trim()) return;

    const reply = {
      id: replies.length + 1,
      user: "You",
      text: newReply,
      replies: [],
    };

    setReplies([...replies, reply]);
    setNewReply("");
  };

  const addNestedReply = (parentId, text) => {
    const recursiveAdd = (replyList) =>
      replyList.map((r) => {
        if (r.id === parentId) {
          return {
            ...r,
            replies: [...(r.replies || []), { id: Date.now(), user: "You", text, replies: [] }],
          };
        } else if (r.replies?.length) {
          return { ...r, replies: recursiveAdd(r.replies) };
        }
        return r;
      });

    setReplies(recursiveAdd(replies));
  };

  const Reply = ({ reply, level = 0 }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [childText, setChildText] = useState("");

    return (
      <li className="reply-item" style={{ "--indent-level": level }}>
        <strong>{reply.user}:</strong> {reply.text}
        <div className="reply-actions">
          <button className="reply-text-button" onClick={() => setShowReplyBox(!showReplyBox)}>
            Reply
          </button>
        </div>
        {showReplyBox && (
          <div className="nested-reply-form">
            <textarea
              className="reply-textarea"
              placeholder="Write a reply..."
              value={childText}
              onChange={(e) => setChildText(e.target.value)}
            />
            <button
              className="reply-button"
              onClick={() => {
                addNestedReply(reply.id, childText);
                setChildText("");
                setShowReplyBox(false);
              }}
            >
              Submit
            </button>
          </div>
        )}
        {reply.replies?.length > 0 && (
          <ul className="nested-replies">
            {reply.replies.map((nested) => (
              <Reply key={nested.id} reply={nested} level={level + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="post-container">
      <div className="post-content-wrapper">
        <div className="Post-header">
          <h1 className="post-title">{post.title}</h1>
        </div>
        <div className="post-meta">
          <span className="post-author">By {post.author}</span>
          <span className="post-date">{post.date}</span>
        </div>
        <hr className="post-divider" />
        <div className="post-content">
          <p>{post.content}</p>
        </div>

        {/* Like Section */}
        <div className="favorite-container">
          <input 
            type="checkbox" 
            id="favorite" 
            checked={isFavorite}
            onChange={handleFavoriteClick}
          />
          <label htmlFor="favorite" className="favorite-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <div className="action">
              <span className="option-1">Community Likes: {likes}</span>
              <span className="option-2">Community Likes: {likes}</span>
            </div>
          </label>
        </div>

        <div className="replies-section">
          <h3 className="replies-heading">Replies</h3>
          <ul className="replies-list">
            {replies.map((reply) => (
              <Reply key={reply.id} reply={reply} />
            ))}
          </ul>

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
