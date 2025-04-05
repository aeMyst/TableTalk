import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Suggest from "./pages/Suggest";
import Blog from "./pages/Blog";
import Queue from "./pages/Queue";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Authentication from "./pages/Authentication";
import GameDetails from "./pages/GameDetails"; 
import Posts from "./pages/Posts";
import "./App.css"; 

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Posts />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Queue" element={<Queue />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Suggest" element={<Suggest />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/game/:gameName" element={<GameDetails />} />
        </Routes>
      </div>
    </div>
  );
}
