import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogPosts from "../database/blogData.jsx";
import "./NewBlog.css";

export default function NewPost() {
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "",
  });

  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPost.title || !newPost.content || !newPost.author) return;

    const newEntry = {
      id: blogPosts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: newPost.author,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      likes: 0,
      replies: [],
    };

    // Add post to the in-memory database
    blogPosts.unshift(newEntry);

    navigate("/blog"); // Go back to blog list
  };

  return (
    <div className="new-post-container">

        <button type="button" className="new-post-cancel-button" onClick={() => navigate("/blog")}>
            Cancel
        </button>


      <h1>Create New Blog Post</h1>
      <form className="new-post-form" onSubmit={handleSubmit}>
        <input
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          placeholder="Blog Title"
          className="new-post-input"
        />
        <textarea
          name="content"
          value={newPost.content}
          onChange={handleInputChange}
          placeholder="Blog Content"
          className="new-post-textarea"
        />
        <input
          name="author"
          value={newPost.author}
          onChange={handleInputChange}
          placeholder="Author Name"
          className="new-post-input"
        />

        <button type="submit" className="new-post-submit-button">
          Publish
        </button>

      </form>
    </div>
  );
}
