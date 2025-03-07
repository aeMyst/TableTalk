import React from 'react';
import "../elements/card.css";
import "./Home.css";
import mainLogo from "../assets/logo/mainLogo.png";

export default function Home() {
  return (
    <div className="home-container">
      <div className="card">
        <div className="logo-container">
          <img src={mainLogo} alt="TableTalk Logo" className="main-logo" />
        </div>
        <h1>Welcome to TableTalk</h1>
      </div>
    </div>
  );
} 