import React, { useState } from "react";
import "../pages/Queue.css";

export default function Queue() {
  const [activeTab, setActiveTab] = useState("friends");
  const [rangeValue, setRangeValue] = useState(0);

  const handleInputChange = (e) => {
    setRangeValue(e.target.value);
  };

  const removeDiv = (btn) => {
    ((btn.parentNode).parentNode).removeChild(btn.parentNode);
  };

  return (
    <div className="queue-wrapper">
      <div className="queue-tabs">
        <button
          className={`queue-tab ${activeTab === "friends" ? "active" : ""}`}
          onClick={() => setActiveTab("friends")}
        >
          🧑‍🤝‍🧑 Friends
        </button>
        <button
          className={`queue-tab ${activeTab === "matchmaking" ? "active" : ""}`}
          onClick={() => setActiveTab("matchmaking")}
        >
          💘 Matchmaking
        </button>
      </div>

      <div className="queue-content">
        {activeTab === "friends" ? (
          <div className="friends-tab">
            <section className="friends-panel">
              <h2>Your Friends</h2>
              <div className="friend-list">
                {["Ben Fren", "Bud Dee", "Quinten Quaintance"].map((name, i) => (
                  <div className="friend-card" key={i}>
                    <div className="friend-info">
                      <h3>{name}</h3>
                      <p>Friends since March {2 + i}</p>
                      <p>{i % 2 === 0 ? `${i + 1} unread message(s)` : "No unread messages"}</p>
                    </div>
                    <div className="friend-actions">
                      <button>Chat</button>
                      <button onClick={(e) => removeDiv(e.target)}>Unfriend</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="add-friend-panel">
              <h2>Add a Friend</h2>
              <input type="text" placeholder="Search by name..." />
              <button>Add Friend</button>
            </section>
          </div>
        ) : (
          <div className="matchmaking-tab">
            <section className="matchmaking-form">
              <h2>Find People to Play With</h2>
              <form>
                <label>Name</label>
                <input type="text" placeholder="Their name..." />

                <label>Game Type</label>
                <select>
                  <option>None</option>
                  <option>Competitive</option>
                  <option>Casual</option>
                </select>

                <label>Genre</label>
                <select>
                  <option>None</option>
                  <option>Area Control</option>
                  <option>Abstract Strategy</option>
                  <option>Cooperative</option>
                  <option>Murder Mystery</option>
                  <option>Party</option>
                  <option>Strategy</option>
                </select>

                <label>Distance: {rangeValue} km</label>
                <input type="range" max="200" value={rangeValue} onChange={handleInputChange} />

                <button type="submit">Search</button>
              </form>
            </section>

            <section className="match-results">
              <h2>Matches</h2>
              {["Joe Shmoe", "James Games", "Jess Chess"].map((name, i) => (
                <div className="match-card" key={i}>
                  <div className="match-info">
                    <h3>{name}</h3>
                    <p>{i === 0 ? "You both like Competitive Games" : i === 1 ? "You're 20km apart" : "You're both friends with Hannah"}</p>
                    <p>You both like Strategy games</p>
                  </div>
                  <div className="match-actions">
                    <button>Message</button>
                    <button onClick={(e) => removeDiv(e.target)}>Ignore</button>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
