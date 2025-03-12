import React from "react";
import "../elements/card.css";
import "./Home.css";
import mainLogo from "../assets/logo/mainLogoCrop.png";
import "../elements/suButton.css"


{/* Note to Self The Main Colors are the Following:
  #3B3F97
  #5781CB
  #B8D2FF
  #FFF3E5 */}

export default function Home() {
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
          <button className="sign-Button">
            Sign up
            <div class="arrow-wrapper">
              <div class="arrow"></div>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
} 