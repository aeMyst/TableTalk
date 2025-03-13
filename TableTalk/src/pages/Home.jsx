import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../elements/card.css";
import "./Home.css";
import mainLogo from "../assets/logo/mainLogoCrop.png";
import "../elements/suButton.css";

export default function Home() {
  const navigate = useNavigate(); 

  return (
    <div className="home-container">
      {/* Hero Section */}
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
    </div>
  );
}
