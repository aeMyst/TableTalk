import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Logo from "../assets/logo/logo.svg";
import BlogSvg from "../assets/navbar/blogIcon.svg";
import QueueSvg from "../assets/navbar/queueIcon.svg";
import SearchSvg from "../assets/navbar/searchIcon.svg";
import ProfileSvg from "../assets/navbar/profileIcon.svg";
import GameSvg from "../assets/navbar/gameIcon.svg";
import BellSvg from "../assets/navbar/bell.svg";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your blog received a like." },
    { id: 2, message: "Someone replied to your comment." }
  ]);

  const isActive = (path) => {
    return path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav>
      <div className="nav-wrapper">
        {/* Left side */}
        <div className="nav-box">
          <div className="button-container">
            <Link to="/" className={`button ${isActive("/") ? "active" : ""}`}>
              <img src={Logo} alt="Home" className="icon" />
              <span className="link-title">Home</span>
            </Link>
            <Link to="/search" className={`button ${isActive("/search") ? "active" : ""}`}>
              <img src={SearchSvg} alt="Search" className="icon" />
              <span className="link-title">Search</span>
            </Link>
            <Link to="/blog" className={`button ${isActive("/blog") ? "active" : ""}`}>
              <img src={BlogSvg} alt="Blog" className="icon" />
              <span className="link-title">Blog</span>
            </Link>
            <Link to="/queue" className={`button ${isActive("/queue") ? "active" : ""}`}>
              <img src={QueueSvg} alt="Queue" className="icon" />
              <span className="link-title">Matchmaking</span>
            </Link>
            <Link to="/suggest" className={`button ${isActive("/suggest") ? "active" : ""}`}>
              <img src={GameSvg} alt="Suggest" className="icon" />
              <span className="link-title">Suggestions</span>
            </Link>
          </div>
        </div>
        {/* Right side */}
        <div className="nav-box secondary">
          <div className="button-container">
            <div className="notification-wrapper" ref={dropdownRef}>
              <button className="notification-button" onClick={() => setShowDropdown(!showDropdown)}>
                <div className="icon-wrapper">
                  <img src={BellSvg} alt="Notifications" className="icon" />
                  {notifications.length > 0 && <span className="notification-badge" />}
                </div>
                <span className="link-title">Notifications</span>
              </button>

              {showDropdown && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h4>Notifications</h4>
                    {notifications.length > 0 && (
                      <button className="clear-button-notification" onClick={clearNotifications}>
                        Clear All
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <p className="dropdown-empty">No notifications</p>
                  ) : (
                    <ul className="dropdown-list">
                      {notifications.map((note) => (
                        <li key={note.id} className="dropdown-item">
                          {note.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <Link to="/profile" className={`button ${isActive("/profile") ? "active" : ""}`}>
              <img src={ProfileSvg} alt="Profile" className="icon" />
              <span className="link-title">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
