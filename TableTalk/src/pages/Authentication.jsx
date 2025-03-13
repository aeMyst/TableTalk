import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Import hook to read query params
import "./Authentication.css";

export default function Authentication() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "signup" ? "signup" : "login"; // Default to login
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    // Update tab when query params change
    setActiveTab(initialTab);
  }, [searchParams]);

  return (
    <div className="auth-container">
      {/* Auth Card */}
      <div className="auth-card">
        {/* Tabs Section */}
        <div className="auth-tabs">
          <button
            className={`logtab-button ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Log In
          </button>
          <button
            className={`logtab-button ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Authentication Form */}
        <div className="auth-form-container">
          {activeTab === "login" ? (
            <form className="auth-form">
              <h1>Log In</h1>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />

              {/* Remember Me + Forgot Password */}
              <div className="auth-options">
                <div className="remember-me">
                  <input id="rememberMe" type="checkbox" />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <a href="/forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" className="auth-button">Log In</button>
            </form>
          ) : (
            <form className="auth-form">
              <h1>Sign Up</h1>
              <input type="text" placeholder="Username" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Confirm Password" required />

              <button type="submit" className="auth-button">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
