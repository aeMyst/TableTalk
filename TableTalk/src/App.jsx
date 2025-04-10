import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Suggest from "./pages/Suggest";
import Blog from "./pages/Blog";
import Queue from "./pages/Queue";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Authentication from "./pages/Authentication";
import GameDetails from "./pages/GameDetails"; 
import NewBlog from "./pages/NewBlog";
import Posts from "./pages/Posts";
import "./App.css"; 
import "./pages/Chat.css";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [allMessages, setAllMessages] = useState({
    "Chemique": [
      { text: "Hey, want to play Catan later?", sender: "Chemique" },
      { text: "Sure, what time works?", sender: "me" },
    ],
    "ruinremind": [
      { text: "Loved that last game session!", sender: "ruinremind" },
    ],
    "BGEnjoyer": [
      { text: "Do you know the rules to 7 Wonders?", sender: "BGEnjoyer" }
    ]
  });// { "User 2": [{text, sender}, ...] }
  const [newMessage, setNewMessage] = useState("");

  const toggleChat = (username) => {
    if (currentChat === username) {
      setChatOpen(!chatOpen);
    } else {
      setCurrentChat(username);
      setChatOpen(true);
    }
    setChatMinimized(false); // Always expand when toggled
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setAllMessages((prev) => ({
      ...prev,
      [currentChat]: [...(prev[currentChat] || []), { text: newMessage, sender: "me" }],
    }));
    setNewMessage("");
  };

  return (
    <div className="app-container">
      <Navbar toggleChat={toggleChat} />

      <div className="page-container">
        <Routes>
          <Route
            path="/"
            element={<Home toggleChat={toggleChat} />}
          />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Posts />} />
          <Route path="/blog/new" element={<NewBlog />} />
          <Route path="/Search" element={<Search />} />
          <Route
  path="/Queue"
  element={
    <Queue
      allMessages={allMessages}
      setAllMessages={setAllMessages}
      currentChat={currentChat}
      setCurrentChat={setCurrentChat}
      chatOpen={chatOpen}
      setChatOpen={setChatOpen}
      chatMinimized={chatMinimized}
      setChatMinimized={setChatMinimized}
    />
  }
/>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Suggest" element={<Suggest />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/game/:gameName" element={<GameDetails />} />
        </Routes>
      </div>

      {/* Shared Chat Box */}
      {chatOpen && currentChat && (
        <div className={`chat-box ${chatMinimized ? "minimized" : ""}`}>
          <div className="chat-header">
            <span>Chat with {currentChat}</span>
            <div className="chat-controls">
              <button
                className="chat-minimize-button"
                onClick={() => setChatMinimized(!chatMinimized)}
              >
                {chatMinimized ? "▢" : "—"}
              </button>
              <button
                className="chat-close-button"
                onClick={() => setChatOpen(false)}
              >
                X
              </button>
            </div>
          </div>

          {!chatMinimized && (
            <>
              <div className="chat-messages">
                {(allMessages[currentChat] || []).map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-message ${msg.sender === "me" ? "sent" : ""}`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="chat-input-container">
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button className="chat-send-button" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
