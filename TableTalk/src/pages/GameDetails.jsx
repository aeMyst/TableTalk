import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import boardGames from "../database/gamesData.jsx";
import "./GameDetails.css"; 

export default function GameDetails() {
  const { gameName } = useParams();
  const navigate = useNavigate();

  // Find the game in the database
  const game = boardGames.find(g => 
    g.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === gameName
  );

  if (!game) {
    return <h1 className="not-found">Game not found.</h1>;
  }

  return (
    <div className="game-details-container card">
      
      {/* Left Section: Game Image, Basic Info, Likes */}
      <div className="left-section">
        <h1 className="game-title">{game.name}</h1>
        <img src={game.image} alt={game.name} className="game-details-image" />
        
        <div className="game-info">
          <p><strong>Type:</strong> {game.type}</p>
          <p><strong>Objective:</strong> {game.objective}</p>
        </div>

        {/* Like Section */}
        <div className="likes-container">
          <span>❤️ {game.likes}</span>
        </div>
      </div>

      {/* Right Section: Rules & Description */}
      <div className="game-rules-description-container">
        {/* Game Description */}
        <div className="game-description">
          <h2>Description</h2>
          <p>{game.description}</p>
        </div>

        {/* Game Rules */}
        <div className="game-rules">
          <h2>Rules</h2>
          <p>{game.rules}</p>
        </div>

        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        
      </div>

    </div>
  );
}
