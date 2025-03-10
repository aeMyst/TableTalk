import React from "react";
import "../elements/card.css";
import "./Home.css";
import mainLogo from "../assets/logo/mainLogo.png";


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
        <div className="card hero-card">
          <div className="logo-container">
            <img src={mainLogo} alt="TableTalk Logo" className="main-logo" />
          </div>
          <h1>Welcome to TableTalk</h1>
          <p className="hero-subtitle">Play, Plan, and Connect Over Board Games</p>
        </div>
      </section>
    </div>
  );
} 