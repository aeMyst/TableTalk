import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Logo from "../assets/logo/logo.svg";
import BlogSvg from "../assets/navbar/blogIcon.svg";
import QueueSvg from "../assets/navbar/queueIcon.svg";
import SearchSvg from "../assets/navbar/searchIcon.svg";
import ProfileSvg from "../assets/navbar/profileIcon.svg";
import GameSvg from "../assets/navbar/gameIcon.svg";
import BellSvg from "../assets/navbar/bell.svg";
import AboutSvg from "../assets/navbar/aboutUs.svg";
import VisionSvg from "../assets/navbar/vision.svg";
import ContactSvg from "../assets/navbar/contactUs.svg";
import "./Navbar.css";

export default function Navbar({ toggleChat }) {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "ruinremind sent you a message!" }
  ]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(loggedIn);
  }, [location]);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const clearNotifications = () => setNotifications([]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (message, id) => {
    const usernameMatch = message.match(/([a-zA-Z0-9_]+)/);
    if (usernameMatch) {
      toggleChat(usernameMatch[0]);
      setShowDropdown(false);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

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

            {isAuthenticated ? (
              <>
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
              </>
            ) : (
              <>
                <Link to="/about" className={`button ${isActive("/about") ? "active" : ""}`}>
                  <img src={AboutSvg} alt="about" className="icon" />
                  <span className="link-title">About Us</span>
                </Link>
                <Link to="/vision" className={`button ${isActive("/vision") ? "active" : ""}`}>
                  <img src={VisionSvg} alt="vision" className="icon" />
                  <span className="link-title">Our Vision</span>
                </Link>
                <Link to="/contact" className={`button ${isActive("/contact") ? "active" : ""}`}>
                  <img src={ContactSvg} alt="contact" className="icon" />
                  <span className="link-title">Contact Us</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right side */}
        {isAuthenticated && (
          <div className="nav-box secondary">
            <div className="button-container">
              <div className="notification-wrapper" ref={dropdownRef}>
                <div
                  className={`button notification-button ${showDropdown ? "active" : ""}`}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="icon-wrapper">
                    <img src={BellSvg} alt="Notifications" className="icon" />
                    {notifications.length > 0 && <span className="notification-badge" />}
                  </div>
                  <span className="link-title">Notifications</span>
                </div>

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
                          <li
                            key={note.id}
                            className="dropdown-item"
                            onClick={() => handleNotificationClick(note.message, note.id)}
                          >
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
        )}
      </div>
    </nav>
  );
}
