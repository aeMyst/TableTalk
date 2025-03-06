import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo/file.svg";
import BlogSvg from "../assets/svg/blog-svgrepo-com.svg";
import QueueSvg from "../assets/svg/queue-svgrepo-com.svg";
import SearchSvg from "../assets/svg/search-alt-2-svgrepo-com.svg";
import ProfileSvg from "../assets/svg/profile.svg";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown when location changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  const isActive = (path) => {
    // If dropdown is open, only search tab should be active
    if (isDropdownOpen && path !== "/search") {
      return false;
    }
    
    // For search routes, highlight the search icon
    if (location.pathname.startsWith("/search/") && path === "/search") {
      return true;
    }
    
    return location.pathname === path;
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav>
      <div className="nav-content">
        <Link to="/" className={`button ${isActive("/home") ? "active" : ""}`}>
          <img src={Logo} alt="Queue" className="icon" />
          <span className="link-title">Home</span>
        </Link>
        <div className="button-container">
          <Link to="/blog" className={`button ${isActive("/blog") ? "active" : ""}`}>
            <img src={BlogSvg} alt="Blog" className="icon" />
            <span className="link-title">Blog</span>
          </Link>
          <Link to="/queue" className={`button ${isActive("/queue") ? "active" : ""}`}>
            <img src={QueueSvg} alt="Queue" className="icon" />
            <span className="link-title">Queue</span>
          </Link>
          <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
            <button 
              className={`button ${(isDropdownOpen || isActive("/search")) ? "active" : ""}`} 
              onClick={handleDropdownClick}
            >
              <img src={SearchSvg} alt="Search" className="icon" />
              <span className="link-title">Search</span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/search/item 1" className={`dropdown-item ${isActive("/search/item 1") ? "active" : ""}`}>
                  item 1
                </Link>
                <Link to="/search/item 2" className={`dropdown-item ${isActive("/search/item 2") ? "active" : ""}`}>
                  item 2
                </Link>
                <Link to="/search/item 3" className={`dropdown-item ${isActive("/search/item 3") ? "active" : ""}`}>
                  item 3
                </Link>
                <Link to="/search/item 4" className={`dropdown-item ${isActive("/search/item 4") ? "active" : ""}`}>
                  item 4
                </Link>
              </div>
            )}
          </div>
          <Link to="/profile" className={`button ${isActive("/profile") ? "active" : ""}`}>
            <img src={ProfileSvg} alt="Profile" className="icon" />
            <span className="link-title">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
} 