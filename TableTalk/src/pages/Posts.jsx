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

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>404 - Post Not Found</h2>
        <p>Sorry, we couldn’t find that blog post.</p>
      </div>
    );
  }

  const handleLike = () => {
    setLikes((prev) => prev + 1);
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
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-author">By {post.author}</span>
          <span className="post-date">{post.date}</span>
        </div>
        <hr className="post-divider" />
        <div className="post-content">
          <p>{post.content}</p>
        </div>

        {/* Like Section */}
        <div className="like-section">
          <button className="like-button" onClick={handleLike}> Likes: ❤️{likes}</button>
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
