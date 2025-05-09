import React, { useEffect, useState } from "react";
import Hammer from "hammerjs";
import "../pages/Queue.css";
import "../elements/tinderCard.css";
import "../pages/Chat.css";

import users from "../database/userData.jsx";

export default function TinderCards({
  allMessages,
  setAllMessages,
  currentChat,
  setCurrentChat,
  chatOpen,
  setChatOpen,
  chatMinimized,
  setChatMinimized
}) {
  const [activeTab, setActiveTab] = useState("matchmaking");
  const [friendMessage, setFriendMessage] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState(users.slice(0, 3));

  const [matchQueue, setMatchQueue] = useState(
    users.filter((u) => !users.slice(0, 3).some((f) => f.username === u.username))
  );

  const handleSendMessage = () => {
    if (!currentChat || chatInput.trim() === "") return;
    setAllMessages((prev) => ({
      ...prev,
      [currentChat]: [...(prev[currentChat] || []), { sender: "you", text: chatInput }],
    }));
    setChatInput("");
  };

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          setFriends((prev) => [...prev, users.find((u) => u.username === username)]);
          setMatchQueue((prev) => prev.filter((u) => u.username !== username));
          setTimeout(() => setFriendMessage(""), 3000);
        }

        el.classList.toggle("removed", !keep);

        if (!keep && event.deltaX < 0 && username) {
          setMatchQueue((prev) => prev.filter((u) => u.username !== username));
        }

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

  return (
    <div className="queue-wrapper">
      <div className="queue-tabs">
        <button className={`queue-tab ${activeTab === "friends" ? "active" : ""}`} onClick={() => setActiveTab("friends")}>Friends</button>
        <button className={`queue-tab ${activeTab === "matchmaking" ? "active" : ""}`} onClick={() => setActiveTab("matchmaking")}>Matchmaking</button>
      </div>

      {activeTab === "friends" ? (
        <div className="friends-panel">
          <div className="friends-layout">
            <div className="friends-list card-box">
              <h2>Friends</h2>
              <div className="friends-grid">
                {friends.map((friend, idx) => (
                  <div key={idx} className="friend-card">
                    <img src={friend.img} alt={friend.username} className="friend-avatar-img" />
                    <h4>{friend.username}</h4>
                    <button className="chat-button" onClick={() => {
                      setCurrentChat(friend.username);
                      setChatOpen(true);
                      setChatMinimized(false);
                    }}>
                      Chat
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="search-friends card-box">
              <h2>Search For Friends</h2>
              <input
                type="text"
                className="search-input-mm"
                placeholder="Search by username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm &&
                (filteredUsers.length > 0 ? (
                  filteredUsers.map((user, i) => {
                    const isFriend = friends.some((f) => f.username === user.username);
                    return (
                      <div key={i} className="search-result-card">
                        <img src={user.img} alt={user.username} className="friend-avatar-img" />
                        <h4>{user.username}</h4>
                        <button
                          className="add-button"
                          disabled={isFriend}
                          onClick={() => {
                            if (!isFriend) {
                              setFriends((prev) => [...prev, user]);
                              setMatchQueue((prev) => prev.filter((u) => u.username !== user.username));
                            }
                          }}
                          style={{
                            opacity: isFriend ? 0.6 : 1,
                            cursor: isFriend ? "not-allowed" : "pointer",
                          }}
                        >
                          {isFriend ? "Already Added" : "Add Friend"}
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p>No results found</p>
                ))}
            </div>
          </div>

          {chatOpen && currentChat && (
            <div className={`chat-box ${chatMinimized ? "minimized" : ""}`}>
              <div className="chat-header">
                Chat with {currentChat}
                <div className="chat-controls">
                  <button className="chat-minimize-button" onClick={() => setChatMinimized(!chatMinimized)}>
                    {chatMinimized ? "▢" : "—"}
                  </button>
                  <button className="chat-close-button" onClick={() => setChatOpen(false)}>×</button>
                </div>
              </div>

              {!chatMinimized && (
                <>
                  <div className="chat-messages">
                    {(allMessages[currentChat] || []).map((msg, idx) => (
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
                    <button className="chat-send-button" onClick={handleSendMessage}>
                      Send
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="tinder">
          {friendMessage && <div className="friend-message animate">{friendMessage}</div>}
          <div className="tinder--status">
            <span className="emoji-nope">❌</span>
            <span className="emoji-love">❤️</span>
          </div>
          <div className="tinder--cards">
            {matchQueue.length > 0 ? (
              matchQueue.map((user) => (
                <div className="tinder--card" key={user.username}>
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
              ))
            ) : (
              <div className="no-matches-wrapper">
                <div className="no-matches-message">No more matches, check back tomorrow! 😢</div>
              </div>
            )}
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
