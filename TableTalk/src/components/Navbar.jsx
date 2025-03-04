import { Link } from "react-router-dom";
import Logo from "../assets/logo/2-Photoroom.png";
import BlogSvg from "../assets/svg/blog-svgrepo-com.svg";
import QueueSvg from "../assets/svg/queue-svgrepo-com.svg";
import SearchSvg from "../assets/svg/search-alt-2-svgrepo-com.svg";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-content">
        <div className="button-container">
          <Link to="/" className="logo-link">
            <img src={Logo} alt="TableTalk Logo" className="nav-logo" />
          </Link>
          <Link to="/blog" className="button">
            <img src={BlogSvg} alt="Blog" className="icon" />
          </Link>
          <Link to="/queue" className="button">
            <img src={QueueSvg} alt="Queue" className="icon" />
          </Link>
          <Link to="/search" className="button">
            <img src={SearchSvg} alt="Search" className="icon" />
          </Link>
          <Link to="/profile" className="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth="0" fill="currentColor" stroke="currentColor" className="icon">
              <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
} 