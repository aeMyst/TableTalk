import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Suggest from "./pages/Suggest";
import Blog from "./pages/Blog";
import Queue from "./pages/Queue";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import "./App.css"; 

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Queue" element={<Queue />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Suggest" element={<Suggest />} />
        </Routes>
      </div>
    </div>
  );
}
