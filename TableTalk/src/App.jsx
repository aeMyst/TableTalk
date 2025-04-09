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
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatMinimized, setChatMinimized] = useState(false);

  const toggleChat = (username) => {
    if (currentChat === username) {
      setChatOpen(!chatOpen);
    } else {
      setCurrentChat(username);
      setChatOpen(true);
      setMessages([
        { sender: username, text: "Hey! Just wanted to say hi tehe." }
      ]);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="app-container">
      <Navbar toggleChat={toggleChat} />
      
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Posts />} />
          <Route path="/blog/new" element={<NewBlog />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Queue" element={<Queue />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Suggest" element={<Suggest />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/game/:gameName" element={<GameDetails />} />
        </Routes>
      </div>

      {chatOpen && (
  <div className={`chat-box ${chatMinimized ? "minimized" : ""}`}>
    <div className="chat-header">
      <span>Chat with {currentChat}</span>
      <div className="chat-controls">
        <button className="chat-minimize-button" onClick={() => setChatMinimized(!chatMinimized)}>
          {chatMinimized ? "+" : "—"}
        </button>
        <button className="chat-close-button" onClick={() => setChatOpen(false)}>X</button>
      </div>
    </div>

    {!chatMinimized && (
      <>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender === "me" ? "sent" : ""}`}>
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
          <button className="chat-send-button" onClick={sendMessage}>Send</button>
        </div>
      </>
    )}
  </div>
)}
    </div>
  );
}
