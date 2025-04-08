import React, { useEffect, useState } from "react";
import Hammer from "hammerjs";
import "../pages/Queue.css";
import "../elements/tinderCard.css";
import "../pages/Chat.css";

export default function TinderCards() {
  const [activeTab, setActiveTab] = useState("matchmaking");
  const [friendMessage, setFriendMessage] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState({});

  const users = [
    {
      img: "https://a.storyblok.com/f/178900/960x540/9a75be9716/solo-leveling-episode-23.jpg/m/filters:quality(95)format(webp)",
      username: "Ben Fren",
      classification: "Casual",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      img: "https://a.storyblok.com/f/178900/960x540/9a75be9716/solo-leveling-episode-23.jpg/m/filters:quality(95)format(webp)",
      username: "Bud Dee",
      classification: "Competitive",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      img: "https://a.storyblok.com/f/178900/960x540/9a75be9716/solo-leveling-episode-23.jpg/m/filters:quality(95)format(webp)",
      username: "Jess Chess",
      classification: "Strategist",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      img: "https://a.storyblok.com/f/178900/960x540/9a75be9716/solo-leveling-episode-23.jpg/m/filters:quality(95)format(webp)",
      username: "James Games",
      classification: "Techie",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      img: "https://a.storyblok.com/f/178900/960x540/9a75be9716/solo-leveling-episode-23.jpg/m/filters:quality(95)format(webp)",
      username: "Quinten Quaintance",
      classification: "Social",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }
  ];

  useEffect(() => {
    if (activeTab !== "matchmaking") return;

    const tinderContainer = document.querySelector(".tinder");
    const allCards = document.querySelectorAll(".tinder--card");
    const nope = document.getElementById("nope");
    const love = document.getElementById("love");

    function initCards() {
      const newCards = document.querySelectorAll(".tinder--card:not(.removed)");
      newCards.forEach((card, index) => {
        card.style.zIndex = newCards.length - index;
        card.style.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
        card.style.opacity = (10 - index) / 10;
      });
      tinderContainer?.classList.add("loaded");
    }

    initCards();

    allCards.forEach((el) => {
      const hammertime = new Hammer(el);
      hammertime.on("pan", (event) => {
        el.classList.add("moving");
        if (event.deltaX === 0 && event.center.x === 0) return;
        tinderContainer.classList.toggle("tinder_love", event.deltaX > 0);
        tinderContainer.classList.toggle("tinder_nope", event.deltaX < 0);
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;
        el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
      });

      hammertime.on("panend", (event) => {
        el.classList.remove("moving");
        tinderContainer.classList.remove("tinder_love");
        tinderContainer.classList.remove("tinder_nope");

        const moveOutWidth = document.body.clientWidth;
        const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
        const username = el.querySelector("h3")?.textContent;

        if (!keep && event.deltaX > 0 && username) {
          setFriendMessage(`✅ Friend request sent to ${username}`);
          setTimeout(() => setFriendMessage(""), 3000);
        }

        el.classList.toggle("removed", !keep);

        if (keep) {
          el.style.transform = "";
        } else {
          const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
          const toX = event.deltaX > 0 ? endX : -endX;
          const toY = event.deltaY > 0 ? endX : -endX;
          const xMulti = event.deltaX * 0.03;
          const yMulti = event.deltaY / 80;
          const rotate = xMulti * yMulti;

          el.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${rotate}deg)`;
          initCards();
        }
      });
    });

    const createButtonListener = (love) => () => {
      const cards = document.querySelectorAll(".tinder--card:not(.removed)");
      const moveOutWidth = document.body.clientWidth * 1.5;
      if (!cards.length) return;

      const card = cards[0];
      const username = card.querySelector("h3")?.textContent;

      if (love && username) {
        setFriendMessage(`✅ Friend request sent to ${username}`);
        setTimeout(() => setFriendMessage(""), 3000);
      }

      card.classList.add("removed");
      card.style.transform = love
        ? `translate(${moveOutWidth}px, -100px) rotate(-30deg)`
        : `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;

      initCards();
    };

    nope?.addEventListener("click", createButtonListener(false));
    love?.addEventListener("click", createButtonListener(true));
  }, [activeTab]);

  const handleSendMessage = () => {
    if (!activeChat || chatInput.trim() === "") return;
    setChatMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), { sender: "you", text: chatInput }]
    }));
    setChatInput("");
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

      {activeTab === "friends" ? (
        <div className="friends-panel">
 <div className="friends-layout">
  {/* Friends Card */}
  <div className="friends-list card-box">
    <h2>Friends</h2>
    <div className="friends-grid">
      {["Ben Fren", "Bud Dee", "Jess Chess", "James Games", "Quinten Quaintance", "New Pal"].map((friend, idx) => (
        <div key={idx} className="friend-card">
          <div className="friend-avatar">img</div>
          <h4>{friend}</h4>
          <button className="chat-button" onClick={() => setActiveChat(friend)}>Chat</button>
        </div>
      ))}
    </div>
  </div>

  {/* Search Card */}
  <div className="search-friends card-box">
    <h2>Search For Friends</h2>
    <label>Search:</label>
    <input type="text" className="search-input-mm" placeholder="Search by username" />
    <div className="search-result-card">
      <div className="friend-avatar">img</div>
      <h4>User 1</h4>
      <button className="add-button">Add Friend</button>
    </div>
  </div>
</div>

  {/* Chat Box */}
  {activeChat && (
    <div className="chat-box">
      <div className="chat-header">
        Chat with {activeChat}
        <button className="chat-close-button" onClick={() => setActiveChat(null)}>×</button>
      </div>
      <div className="chat-messages">
        {(chatMessages[activeChat] || []).map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender === "you" ? "sent" : ""}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="chat-send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )}
</div>
      ) : (
        <div className="tinder">
          {friendMessage && (
            <div className="friend-message animate">{friendMessage}</div>
          )}

          <div className="tinder--status">
            <span className="emoji-nope">❌</span>
            <span className="emoji-love">❤️</span>
          </div>

          <div className="tinder--cards">
            {users.map((user, i) => (
              <div className="tinder--card" key={i}>
                <div className="profile-section">
                  <img src={user.img} alt={`Profile of ${user.username}`} className="profile-pic" />
                  <h3>{user.username}</h3>
                  <p className="classification">{user.classification}</p>
                </div>
                <div className="description-section">
                  <strong>Description:</strong>
                  <p>{user.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="tinder--buttons">
            <button id="nope">❌</button>
            <button id="love">❤️</button>
          </div>
        </div>
      )}
    </div>
  );
}
