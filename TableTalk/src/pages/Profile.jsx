import React, { useState } from "react";
import "../elements/card.css";
import "./Profile.css";
import picture from "../assets/images/unnamed.jpg";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="profile-container">
      {/* Sidebar for Tabs */}
      <div className="profile-sidebar">
        <button 
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`} 
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button 
          className={`tab-button ${activeTab === "boardgames" ? "active" : ""}`} 
          onClick={() => setActiveTab("boardgames")}
        >
          Board Games
        </button>

        <button 
          className={`tab-button ${activeTab === "settings" ? "active" : ""}`} 
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>

        <button 
          className={`tab-button ${activeTab === "security" ? "active" : ""}`} 
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>

      </div>

      {/* Profile Content */}
      <div className="profile-content card">
        {activeTab === "overview" && (
          <div className="tab-content">
            <h1>User Profile</h1>
            <div className="profile-info">
              <div className="profile-pic-section">
                <img src={picture} alt="Profile" className="profile-pic" />
                <button className="change-pic-btn">Change Profile Picture</button>
              </div>
              <div className="details">
                <div className="info-row">
                  <label>Username:</label>
                  <p>JohnDoe</p>
                </div>
                <div className="info-row">
                  <label>Email:</label>
                  <p>johndoe@example.com</p>
                </div>
                <div className="info-row">
                  <label>Password:</label>
                  <p>**********</p>
                </div>
              </div>
            </div>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        )}

        {activeTab === "boardgames" && (
          <div className="tab-content">
            <h1>test</h1>
            <p>test</p>
          </div>
        )}



        {activeTab === "settings" && (
          <div className="tab-content">
            <h1>Settings</h1>
            <p>Customize your profile settings here.</p>
          </div>
        )}

        {activeTab === "security" && (
          <div className="tab-content">
            <h1>Security</h1>
            <p>Update your password and security settings here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
