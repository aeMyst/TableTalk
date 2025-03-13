import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./Search.css";
import HeartIcon from "../assets/svg/heart.svg";
import boardGames from "../database/gamesData.jsx"; 

export default function Search() {
  const gameTypes = ["Area Control", "Abstract Strategy", "Cooperative", "Murder Mystery", "Party", "Strategy"];
  const gameObjectives = ["Competitive", "Casual"];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedObjective, setSelectedObjective] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 4;

  const filteredGames = boardGames
    .filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType ? game.type === selectedType : true) &&
      (selectedObjective ? game.objective === selectedObjective : true)
    )
    .sort((a, b) => b.likes - a.likes);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="search-page-container">
      {/* Filter Card */}
      <div className="filter-card card">
        <h2>Filter Board Games</h2>
        
        <label className="filter-label">Search:</label>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a board game..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <label className="filter-label">Game Type:</label>
        <select className="filter-dropdown" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">All Game Types</option>
          {gameTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label className="filter-label">Game Objective:</label>
        <select className="filter-dropdown" value={selectedObjective} onChange={(e) => setSelectedObjective(e.target.value)}>
          <option value="">All Objectives</option>
          {gameObjectives.map(objective => (
            <option key={objective} value={objective}>{objective}</option>
          ))}
        </select>
      </div>

      {/* Leaderboard Display */}
      <div className="search-results card">
        <h1>Game Leaderboard</h1>
        <div className="leaderboard">
          {currentGames.length === 0 ? (
            <p className="no-results">No games found.</p>
          ) : (
            currentGames.map((game, index) => (
              <Link key={game.name} to={`/game/${game.name.toLowerCase().replace(/\s+/g, "-")}`} className="leaderboard-card">
                <span className="rank">#{indexOfFirstGame + index + 1}</span>
                
                <img src={game.image} alt={game.name} className="game-image" />
                
                <div className="game-info-search">
                  <h3>{game.name}</h3>
                  <p>Type: {game.type}</p>
                  <p>Objective: {game.objective}</p>
                </div>
                
                <div className="likes-container">
                  <img src={HeartIcon} alt="Likes" className="heart-icon" />
                  <span>{game.likes}</span>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
