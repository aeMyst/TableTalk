import React, { useState } from "react";
import "./Search.css";
import HeartIcon from "../assets/svg/heart.svg";

// Import Board Game Images
import CatanImage from "../assets/gameImages/placeholder.webp";
import TicketToRideImage from "../assets/gameImages/placeholder.webp";
import GloomhavenImage from "../assets/gameImages/placeholder.webp";
import ChessImage from "../assets/gameImages/placeholder.webp";
import ExplodingKittensImage from "../assets/gameImages/placeholder.webp";
import ClueImage from "../assets/gameImages/placeholder.webp";
import PandemicImage from "../assets/gameImages/placeholder.webp";
import MonopolyImage from "../assets/gameImages/placeholder.webp";
import DominionImage from "../assets/gameImages/placeholder.webp";
import Wonders7Image from "../assets/gameImages/placeholder.webp";
import AzulImage from "../assets/gameImages/placeholder.webp";
import RiskImage from "../assets/gameImages/placeholder.webp";

export default function Search() {
  const boardGames = [
    { name: "Catan", type: "Area Control", objective: "Casual", likes: 1200, image: CatanImage },
    { name: "Ticket to Ride", type: "Area Control", objective: "Casual", likes: 950, image: TicketToRideImage },
    { name: "Gloomhaven", type: "Strategy", objective: "Competitive", likes: 800, image: GloomhavenImage },
    { name: "Chess", type: "Abstract Strategy", objective: "Competitive", likes: 1800, image: ChessImage },
    { name: "Exploding Kittens", type: "Party", objective: "Casual", likes: 1100, image: ExplodingKittensImage },
    { name: "Clue", type: "Murder Mystery", objective: "Competitive", likes: 750, image: ClueImage },
    { name: "Pandemic", type: "Cooperative", objective: "Casual", likes: 1300, image: PandemicImage },
    { name: "Monopoly", type: "Area Control", objective: "Competitive", likes: 600, image: MonopolyImage },
    { name: "Dominion", type: "Strategy", objective: "Competitive", likes: 700, image: DominionImage },
    { name: "7 Wonders", type: "Strategy", objective: "Casual", likes: 950, image: Wonders7Image },
    { name: "Azul", type: "Abstract Strategy", objective: "Casual", likes: 880, image: AzulImage },
    { name: "Risk", type: "Area Control", objective: "Competitive", likes: 650, image: RiskImage },
  ];

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
              <div key={game.name} className="leaderboard-card">
                <span className="rank">#{indexOfFirstGame + index + 1}</span>
                
                <img src={game.image} alt={game.name} className="game-image" />
                
                <div className="game-info">
                  <h3>{game.name}</h3>
                  <p>Type: {game.type}</p>
                  <p>Objective: {game.objective}</p>
                </div>
                
                <div className="likes-container">
                  <img src={HeartIcon} alt="Likes" className="heart-icon" />
                  <span>{game.likes}</span>
                </div>
              </div>
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
