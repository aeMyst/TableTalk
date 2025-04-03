import React, { useState } from 'react';
import "../elements/card.css";
import "./Blog.css";
import blogPosts from "../database/blogData.jsx";

const Post = ({ title, excerpt, author, date }) => (
  <article className="blog-post-card">
    <div className="blog-post-content">
      <h2 className="blog-post-title">{title}</h2>
      <p className="blog-post-excerpt">{excerpt}</p>
      <div className="blog-post-meta">
        <span className="blog-author">By {author}</span>
        <span className="blog-date">{date}</span>
      </div>
    </div>
    <div className="blog-post-footer"></div>
  </article>
);

export default function Blog() {
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="blog-container">
      <div className="blog-content-wrapper">
        {/* Controls Section */}
        <div className="blog-controls">
          <div className="blog-search-box">
            <h2 className="blog-search-title">Search</h2>
            <input
              type="text"
              placeholder="Search blog posts..."
              className="blog-search-input"
            />
          </div>

          <div className="blog-sort-box">
            <h2 className="blog-sort-title">Sort By</h2>
            <select
              className="blog-sort-dropdown"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Blog Content Section */}
        <div className="blog-layout">
          <main className="blog-main">
            <div className="blog-heading-row">
              <h1 className="blog-heading">Blog Posts</h1>
              <button className="blog-add-button">+ Add New Blog Post</button>
            </div>
            <div className="blog-post-list">
              {currentPosts.map((post) => (
                <Post
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  date={post.date}
                />
              ))}
            </div>

            {/* Pagination Section */}
            <div className="pagination-blog">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`page-button-blog ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
