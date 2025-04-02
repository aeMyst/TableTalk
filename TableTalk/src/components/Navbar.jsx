import { Link, useLocation } from "react-router-dom";
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

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <nav>
      <div className="nav-content">
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
            <span className="link-title">Queue</span>
          </Link>

          <Link to="/suggest" className={`button ${isActive("/suggest") ? "active" : ""}`}>
            <img src={GameSvg} alt="Suggest" className="icon" />
            <span className="link-title">Suggest</span>
          </Link>

          <Link to="/notifications" className={`button ${isActive("/notifications") ? "active" : ""}`}>
            <img src={BellSvg} alt="Notification" className="icon" />
            <span className="link-title">Notification</span>
          </Link>

          <Link to="/profile" className={`button ${isActive("/profile") ? "active" : ""}`}>
            <img src={ProfileSvg} alt="Profile" className="icon" />
            <span className="link-title">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
