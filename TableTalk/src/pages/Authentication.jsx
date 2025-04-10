import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Authentication.css";

export default function Authentication() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialTab = searchParams.get("tab") === "signup" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [searchParams]);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    navigate("/");
  };

  const validateSignup = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /[0-9]/;

    if (signupData.username.length < 5) {
      newErrors.username = "Username must be at least 5 characters.";
    }

    if (!emailRegex.test(signupData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (signupData.password.length < 5 || !numberRegex.test(signupData.password)) {
      newErrors.password = "Password must be at least 5 characters and contain a number.";
    }

    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateSignup()) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
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

        <div className="auth-form-container">
          {activeTab === "login" ? (
            <form className="auth-form" onSubmit={handleLogin}>
              <h1>Log In</h1>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />

              <div className="auth-options">
                <div className="remember-me">
                  <input id="rememberMe" type="checkbox" />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <button
                  type="button"
                  className="forgot-password-button"
                  onClick={() => setShowForgotModal(true)}
                >
                  Forgot Password?
                </button>
              </div>

              <button type="submit" className="auth-button">Log In</button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSignup}>
              <h1>Sign Up</h1>

              <div className="input-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={signupData.username}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField("")}
                />
                {focusedField === "username" && (
                  <p className="auth-tooltip">At least 5 characters</p>
                )}
                {errors.username && <p className="auth-error">{errors.username}</p>}
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                />
                {focusedField === "email" && (
                  <p className="auth-tooltip">Enter a valid email (e.g., user@mail.com)</p>
                )}
                {errors.email && <p className="auth-error">{errors.email}</p>}
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                />
                {focusedField === "password" && (
                  <p className="auth-tooltip">Min 5 characters, 1 number</p>
                )}
                {errors.password && <p className="auth-error">{errors.password}</p>}
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={signupData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField("")}
                />
                {focusedField === "confirmPassword" && (
                  <p className="auth-tooltip">Must match password above</p>
                )}
                {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" className="auth-button">Sign Up</button>
            </form>
          )}
        </div>
      </div>

      {/* Modal for forgot password */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Forgot Password</h2>
            <p>This feature is not implemented, but let's just say your password was changed!</p>
            <button onClick={() => setShowForgotModal(false)} className="auth-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
