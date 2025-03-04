import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo/2-Photoroom.png";
import BlogSvg from "../assets/svg/blog-svgrepo-com.svg";
import QueueSvg from "../assets/svg/queue-svgrepo-com.svg";
import SearchSvg from "../assets/svg/search-alt-2-svgrepo-com.svg";
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
    e.stopPropagation(); // Prevent click from bubbling up
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
        <div className="button-container">
          <Link to="/" className={`logo-link ${isActive("/") ? "active" : ""}`}>
            <img src={Logo} alt="TableTalk Logo" className="nav-logo" />
          </Link>
          <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
            <button 
              className={`button ${(isDropdownOpen || isActive("/search")) ? "active" : ""}`} 
              onClick={handleDropdownClick}
            >
              <img src={SearchSvg} alt="Search" className="icon" />
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/search/users" className={`dropdown-item ${isActive("/search/users") ? "active" : ""}`}>
                  Find Users
                </Link>
                <Link to="/search/restaurants" className={`dropdown-item ${isActive("/search/restaurants") ? "active" : ""}`}>
                  Find Restaurants
                </Link>
                <Link to="/search/reviews" className={`dropdown-item ${isActive("/search/reviews") ? "active" : ""}`}>
                  Search Reviews
                </Link>
                <Link to="/search/advanced" className={`dropdown-item ${isActive("/search/advanced") ? "active" : ""}`}>
                  Advanced Search
                </Link>
              </div>
            )}
          </div>
          <Link to="/blog" className={`button ${isActive("/blog") ? "active" : ""}`}>
            <img src={BlogSvg} alt="Blog" className="icon" />
          </Link>
          <Link to="/queue" className={`button ${isActive("/queue") ? "active" : ""}`}>
            <img src={QueueSvg} alt="Queue" className="icon" />
          </Link>
          <Link to="/profile" className={`button ${isActive("/profile") ? "active" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="0" fill="currentColor" stroke="currentColor" className="icon">
              <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
} 