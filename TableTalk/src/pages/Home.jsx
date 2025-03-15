import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../elements/card.css";
import "./Home.css"; 
import "./mainHome.css"; 
import "./Chat.css";
import "../elements/suButton.css";
import mainLogo from "../assets/logo/mainLogoCrop.png";
import boardGames from "../database/gamesData.jsx";
import blogPosts from "../database/blogData.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(userLoggedIn);
  }, []);

  const getOrdinalSuffix = (rank) => {
    if (rank === 1) return "#1";
    if (rank === 2) return "#2";
    if (rank === 3) return "#3";
    return `${rank}th`;
  };

  const topGames = boardGames.sort((a, b) => b.likes - a.likes).slice(0, 3);
  const recentBlogs = blogPosts.slice(0, 3);

  const recentMatches = [
    { opponent: "Alice", chatLink: "/chat/alice" },
    { opponent: "Bob", chatLink: "/chat/bob" },
    { opponent: "Charlie", chatLink: "/chat/charlie" },
  ];

  const toggleChat = (opponent) => {
    if (currentChat === opponent) {
      setChatOpen(!chatOpen);
    } else {
      setCurrentChat(opponent);
      setChatOpen(true);
      setMessages([]); 
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

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
                  <button 
                    className="dashboard-chat-button" 
                    onClick={() => toggleChat(match.opponent)}
                  >
                    Open Chat
                  </button>
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

      {/* Chat Box */}
      {chatOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <span>Chat with {currentChat}</span>
            <button className="chat-close-button" onClick={() => setChatOpen(false)}>X</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender === "me" ? "sent" : ""}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input-container">
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Type a message..." 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} 
            />
            <button className="chat-send-button" onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
