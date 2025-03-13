import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../elements/card.css";
import "./Home.css"; // Landing Page Styling
import "./mainHome.css"; // Logged-in Dashboard Styling
import mainLogo from "../assets/logo/mainLogoCrop.png";
import boardGames from "../database/gamesData.jsx";
import blogPosts from "../database/blogData.jsx";
import "../elements/suButton.css";

export default function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(userLoggedIn);
  }, []);

  // Function to get ordinal suffixes (1st, 2nd, 3rd, etc.)
  const getOrdinalSuffix = (rank) => {
    if (rank === 1) return "#1";
    if (rank === 2) return "#2";
    if (rank === 3) return "#3";
    return `${rank}th`;
  };

  // Select top 3 games for preview
  const topGames = boardGames.sort((a, b) => b.likes - a.likes).slice(0, 3);
  
  // Select top 3 latest blog posts
  const recentBlogs = blogPosts.slice(0, 3);

  // Fake Recent Matches Data
  const recentMatches = [
    { opponent: "Alice", chatLink: "/chat/alice" },
    { opponent: "Bob", chatLink: "/chat/bob" },
    { opponent: "Charlie", chatLink: "/chat/charlie" },
  ];

  return (
    <div className="home-container">
      {isAuthenticated ? (
        <section className="home-dashboard">
          <div className="dashboard-welcome-card">
            <h1>Welcome Back!</h1>
            <p>Discover new board games, plan game nights, and connect with your friends.</p>
            
            <div className="dashboard-actions">
              <button className="dashboard-action-button" onClick={() => navigate("/queue")}>View New Matches</button>
            </div>

            <h2 className="dashboard-matches-title">Friends</h2>
            <div className="dashboard-matches-list">
              {recentMatches.map((match, index) => (
                <div key={index} className="dashboard-match-item">
                  <p><strong>{match.opponent}</strong></p>
                  <button className="dashboard-chat-button" onClick={() => navigate(match.chatLink)}>Open Chat</button>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-preview-card">
            <h2>Top Board Games</h2>
            <div className="dashboard-preview-list">
              {topGames.map((game, index) => (
                <div key={game.name} className="dashboard-preview-item">
                  <span className="dashboard-rank">{getOrdinalSuffix(index + 1)}</span>
                  <img src={game.image} alt={game.name} className="dashboard-preview-image" />
                  <div className="dashboard-preview-info">
                    <h3>{game.name}</h3>
                    <p>{game.type} - {game.objective}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="dashboard-view-more-button" onClick={() => navigate("/search")}>View More</button>
          </div>

          <div className="dashboard-blog-preview">
            <h2>Latest Blog Posts</h2>
            <div className="dashboard-blog-list">
              {recentBlogs.length > 0 ? (
                recentBlogs.map((blog) => (
                  <div key={blog.id} className="dashboard-blog-item">
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                  </div>
                ))
              ) : (
                <p>No blog posts available.</p>
              )}
            </div>
            <button className="dashboard-view-more-button" onClick={() => navigate("/blog")}>View More</button>
          </div>
        </section>
      ) : (
        // Landing Page (Unauthenticated)
        <section className="hero-section">
          <div className="home-card hero-card">
            <h1 className="hero-title">Welcome to</h1>
            <div className="logo-container">
              <img src={mainLogo} alt="TableTalk Logo" className="main-logo" />
            </div>
            <p className="hero-subtitle">Play, Plan, and Connect Over Board Games</p>

            <div className="auth-buttons">
              <button className="sign-Button" onClick={() => navigate("/auth?tab=signup")}>
                Sign up
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </button>

              <button className="sign-Button" onClick={() => navigate("/auth?tab=login")}>
                Log in
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
