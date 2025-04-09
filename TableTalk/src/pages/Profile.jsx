import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../elements/card.css";
import "./Profile.css";
import placeholder from "../assets/gameImages/placeholder.webp";
import defaultPic from "../assets/images/profile1.jpg";
import availableBoardGames from "../database/gamesData.jsx";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false); 
  const [description, setDescription] = useState("Lorem ipsum dolor sit amet...");
  const [tags, setTags] = useState(["Competitive", "Fun"]);
  const [newTag, setNewTag] = useState("");
  const [classification, setClassification] = useState("Intermediate");
  const [profilePic, setProfilePic] = useState(defaultPic);
  const [isAddingGame, setIsAddingGame] = useState(false);
  const [newGameName, setNewGameName] = useState("");
  const [gameError, setGameError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [boardGames, setBoardGames] = useState([
    { name: "Catan", image: placeholder },
    { name: "Ticket to Ride", image: placeholder },
    { name: "Gloomhaven", image: placeholder },
    { name: "Carcassonne", image: placeholder },
  ]);

  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    password: false,
    description: false,
    tags: false,
    classification: false,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const confirmAddBoardGame = () => {
    const trimmedName = newGameName.trim();
    if (!trimmedName) return;
  
    const alreadyAdded = boardGames.some(
      (game) => game.name.toLowerCase() === trimmedName.toLowerCase()
    );
  
    if (alreadyAdded) {
      setGameError(`${trimmedName} is already in your list.`);
      return;
    }
  
    const found = availableBoardGames.find(
      (game) => game.name.toLowerCase() === trimmedName.toLowerCase()
    );
  
    const newGame = found
      ? { name: found.name, image: found.image }
      : { name: trimmedName, image: placeholder };
  
    setBoardGames([...boardGames, newGame]);
    setNewGameName("");
    setGameError("");
    setIsAddingGame(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <button className={`tab-button ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>Overview</button>
        <button className={`tab-button ${activeTab === "boardgames" ? "active" : ""}`} onClick={() => setActiveTab("boardgames")}>Board Games</button>
        <button className={`tab-button ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>Settings</button>
        <hr className="sidebar-divider" />
        <button className="logout-button-sidebar" onClick={handleLogout}>Log Out</button>
      </div>

      <div className="profile-content card">
        {activeTab === "overview" && (
          <div className="tab-content">
            <h1>User Profile</h1>
            <div className="profile-info">
              <div className="profile-pic-section">
                <img src={profilePic} alt="Profile" className="profile-pic" />
                <label htmlFor="profilePicUpload" className="change-pic-btn">Change Profile Picture</label>
                <input id="profilePicUpload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
              </div>
              <div className="details">
                {/* Username */}
                <div className="info-row">
                  <label>Username:</label>
                  {isEditing.username ? (
                    <>
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-inline" />
                      <button className="edit-btn" onClick={() => toggleEdit("username")}>Save</button>
                    </>
                  ) : (
                    <>
                      <p>{username}</p>
                      <button className="edit-btn" onClick={() => toggleEdit("username")}>Edit</button>
                    </>
                  )}
                </div>

                {/* Email */}
                <div className="info-row">
                  <label>Email:</label>
                  {isEditing.email ? (
                    <>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-inline" />
                      <button className="edit-btn" onClick={() => toggleEdit("email")}>Save</button>
                    </>
                  ) : (
                    <>
                      <p>{email}</p>
                      <button className="edit-btn" onClick={() => toggleEdit("email")}>Edit</button>
                    </>
                  )}
                </div>

                {/* Password */}
                <div className="info-row">
                  <label>Password:</label>
                  {isEditing.password ? (
                    <>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-inline" />
                      <button className="edit-btn" onClick={() => toggleEdit("password")}>Save</button>
                    </>
                  ) : (
                    <>
                      <p>{showPassword ? password : "●●●●●●●●"}</p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="edit-btn" onClick={() => toggleEdit("password")}>Edit</button>
                        <button className="edit-btn" onClick={() => setShowPassword((prev) => !prev)}>
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <hr className="section-divider" />
            <h2>Matchmaking Preferences</h2>
            <div className="details">
              {/* Tags */}
              <div className="info-row">
                <label>Tags:</label>
                {isEditing.tags ? (
                  <div style={{ flexGrow: 1 }}>
                    <div className="tag-list" style={{ marginBottom: "10px" }}>
                      {tags.map((tag, index) => (
                        <span key={index} className="tag-item">
                          {tag}
                          <button className="tag-remove-btn" onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}>×</button>
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newTag.trim() && tags.length < 10) {
                            e.preventDefault();
                            const trimmed = newTag.trim();
                            if (!tags.includes(trimmed)) {
                              setTags([...tags, trimmed]);
                            }
                            setNewTag("");
                          }
                        }}
                        placeholder="Enter a new tag"
                        className="input-inline"
                        disabled={tags.length >= 10}
                      />
                      <button className="edit-btn" onClick={() => {
                        const trimmed = newTag.trim();
                        if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
                          setTags([...tags, trimmed]);
                          setNewTag("");
                        }
                      }} disabled={tags.length >= 10}>Add</button>
                      <button className="edit-btn" onClick={() => toggleEdit("tags")}>Done</button>
                    </div>
                    {tags.length >= 10 && (
                      <p style={{ color: "#888", fontSize: "0.85rem", marginTop: "6px" }}>
                        Tag limit reached (10 tags max).
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <p>{tags.join(", ")}</p>
                    <button className="edit-btn" onClick={() => toggleEdit("tags")}>Edit</button>
                  </>
                )}
              </div>

              {/* Classification */}
              <div className="info-row">
                <label>Classification:</label>
                {isEditing.classification ? (
                  <>
                    <select value={classification} onChange={(e) => setClassification(e.target.value)} className="input-inline">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <button className="edit-btn" onClick={() => toggleEdit("classification")}>Save</button>
                  </>
                ) : (
                  <>
                    <p>{classification}</p>
                    <button className="edit-btn" onClick={() => toggleEdit("classification")}>Edit</button>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="info-row description-row">
                <label>Description:</label>
                {isEditing.description ? (
                  <>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-inline" />
                    <button className="edit-btn" onClick={() => toggleEdit("description")}>Save</button>
                  </>
                ) : (
                  <>
                    <p className="description-text">{description}</p>
                    <button className="edit-btn" onClick={() => toggleEdit("description")}>Edit</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "boardgames" && (
          <div className="tab-content">
            <h1>Board Games</h1>
            <div className="boardgames-grid">
              {boardGames.map((game, index) => (
                <div key={index} className="boardgame-card">
                  <img src={game.image} alt={game.name} className="boardgame-image" />
                  <p>{game.name}</p>
                </div>
              ))}
{isAddingGame ? (
  <div className="boardgame-card add-card" style={{ flexDirection: "column" }}>
    <input
      type="text"
      value={newGameName}
      onChange={(e) => setNewGameName(e.target.value)}
      placeholder="Enter Game"
      className="input-inline"
      style={{ marginBottom: "8px" }}
    />
<div className="add-card-buttons">
  <button className="edit-btn" onClick={confirmAddBoardGame}>Confirm</button>
  <button className="edit-btn" onClick={() => {
    setIsAddingGame(false);
    setNewGameName("");
    setGameError("");
  }}>Cancel</button>
</div>
    {gameError && <p style={{ color: "red", marginTop: "6px" }}>{gameError}</p>}
  </div>
) : (
  <div className="boardgame-card add-card" onClick={() => setIsAddingGame(true)}>
    <p>+ Add Game</p>
  </div>
)}
            </div>
          </div>
        )}

{activeTab === "settings" && (
  <div className="tab-content">
    <h1>Settings</h1>

    <div className="settings-option">
      <label>Enable Dark Mode</label>
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span className="slider"></span>
      </label>
    </div>

    <div className="settings-option">
      <label>Email Notifications</label>
      <label className="switch">
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={() => setEmailNotifications(!emailNotifications)}
        />
        <span className="slider"></span>
      </label>
    </div>

    <div className="settings-option">
      <label>Show Game Suggestions on Homepage</label>
      <label className="switch">
        <input
          type="checkbox"
          checked={showSuggestions}
          onChange={() => setShowSuggestions(!showSuggestions)}
        />
        <span className="slider"></span>
      </label>
    </div>

    <p style={{ marginTop: "20px", color: "#888" }}>
      These settings are just for demo purposes and aren't stored permanently.
    </p>
  </div>
)}
      </div>
    </div>
  );
}
