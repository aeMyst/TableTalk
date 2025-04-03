import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./Search.css";
import HeartIcon from "../assets/svg/heart.svg";
import boardGames from "../database/gamesData.jsx"; 

export default function Search() {
  const gameTypes = ["Area Control", "Abstract Strategy", "Cooperative", "Murder Mystery", "Party", "Strategy"];
  const gameObjectives = ["Competitive", "Casual"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedObjective, setSelectedObjective] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 5;

  const isFilterActive =
  searchTerm !== "" ||
  selectedType !== "" ||
  selectedObjective !== "" ||
  maxPlayers !== "" ||
  difficulty !== "" ||
  sortOrder !== "desc";

  const filteredGames = boardGames
    .filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType ? game.type === selectedType : true) &&
      (selectedObjective ? game.objective === selectedObjective : true) &&
      (maxPlayers ? game.maxPlayers <= parseInt(maxPlayers) : true) &&
      (difficulty ? game.difficulty === difficulty : true)
    )
    .sort((a, b) => sortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedObjective("");
    setMaxPlayers("");
    setDifficulty("");
    setSortOrder("desc");
    setCurrentPage(1);
  };

  return (
    <div className="search-page-container">
      <div className="search-layout">
      <div className="filter-section">
  {/* Search Box */}
  <div className="search-box card">
    <h2 className="mb-4">SEARCH</h2>
    <input
      type="text"
      className="search-input"
      placeholder="Search for a board game..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {/* Sort Box */}
  <div className="sort-box card">
    <h2 className="mb-4">Sort</h2>
    <select
      className="filter-dropdown"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="desc">Best to Worst</option>
      <option value="asc">Worst to Best</option>
    </select>
  </div>

  {/* Filter Box */}
  <div className="filter-box card">
    <h2 className="mb-4">Filter Board Games</h2>

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

    <label className="filter-label">Max Players:</label>
    <input
      type="number"
      className="search-input"
      placeholder="e.g. 4"
      value={maxPlayers}
      onChange={(e) => setMaxPlayers(e.target.value)}
    />

    <label className="filter-label">Difficulty:</label>
    <select className="filter-dropdown" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
      <option value="">All Difficulties</option>
      {difficulties.map(level => (
        <option key={level} value={level}>{level}</option>
      ))}
    </select>

    {isFilterActive && (
      <button className="reset-button" onClick={handleResetFilters}>
        Reset Filters
      </button>
    )}
  </div>
</div>


        <div className="search-results card">
          <h1>Game Leaderboard</h1>
          <div className="leaderboard-content">
            <div className="leaderboard">
              {currentGames.length === 0 ? (
                <p className="no-results">No games found.</p>
              ) : (
                currentGames.map((game, index) => (
                  <Link key={game.name} to={`/game/${game.name.toLowerCase().replace(/\s+/g, "-")}`} className="leaderboard-card">
                    <span className="rank">
                      #{sortOrder === "asc"
                        ? filteredGames.length - (indexOfFirstGame + index)
                        : indexOfFirstGame + index + 1}
                    </span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
