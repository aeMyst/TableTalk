import React, { useState } from 'react'; 
import "../elements/card.css";
import "./Suggest.css";

import PandemicImage from '../assets/gameImages/Pandemic.jpg';
import CatanImage from '../assets/gameImages/Catan.jpeg';
import ChessImage from '../assets/gameImages/Chess.jpeg';
import Pandemic2Image from '../assets/gameImages/Pandemic2.jpeg';
import ClueImage from '../assets/gameImages/Clue.jpeg';
import ExplodingKittensImage from '../assets/gameImages/explodingKittens.jpeg';
import TicketToRideImage from '../assets/gameImages/ticketToRide.jpg';
import MonopolyImage from '../assets/gameImages/monopoly.jpg';

export default function Suggest() {
  const [formData, setFormData] = useState({
    NumberPeople: '',
    groupObjective: '',
    gameType: '',
  });

  const [filteredGames, setFilteredGames] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const gameTypes = ['Area Control', 'Abstract Strategy', 'Murder Mystery', 'Other'];

  // Removed "Cooperative" from group objectives
  const groupObjectives = ['Competitive', 'Casual', 'Party'];

  const allBoardGames = [
    { name: "Pandemic", type: "Cooperative", objectives: ["Casual"], players: [2, 4], image: PandemicImage },
    { name: "Catan", type: "Area Control", objectives: ["Casual"], players: [3, 6], image: CatanImage },
    { name: "Chess", type: "Abstract Strategy", objectives: ["Competitive"], players: [2, 2], image: ChessImage },
    { name: "Pandemic 2.0", type: "Cooperative", objectives: ["Casual"], players: [4, 4], image: Pandemic2Image },
    { name: "Clue", type: "Murder Mystery", objectives: ["Casual", "Competitive"], players: [4, 8], image: ClueImage },
    { name: "Exploding Kittens", type: "Other", objectives: ["Party", "Casual"], players: [4, 6], image: ExplodingKittensImage },
    { name: "Ticket to Ride", type: "Area Control", objectives: ["Casual"], players: [4, 10], image: TicketToRideImage },
    { name: "Monopoly", type: "Area Control", objectives: ["Competitive", "Casual"], players: [2, 8], image: MonopolyImage },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnimating(true);

    let gamesToFilter = selectedCategory === "yourGames" ? allBoardGames.slice(0, 4) : allBoardGames;

    const filteredGames = gamesToFilter.filter(game => {
      const { NumberPeople, groupObjective, gameType } = formData;

      const isPlayerCountValid = !NumberPeople || 
        (Array.isArray(game.players) 
          ? game.players[0] <= parseInt(NumberPeople) && game.players[1] >= parseInt(NumberPeople) 
          : game.players === parseInt(NumberPeople));

      const isObjectiveValid = !groupObjective || game.objectives.includes(groupObjective);
      const isTypeValid = !gameType || game.type === gameType;

      return isPlayerCountValid && isObjectiveValid && isTypeValid;
    });

    // Select a maximum of 3 games
    const limitedGames = filteredGames.length > 3
      ? filteredGames.sort(() => 0.5 - Math.random()).slice(0, 3)
      : filteredGames;

    setTimeout(() => {
      setFilteredGames(limitedGames);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="suggest-container">
      {/* Main Content */}
      <div className="suggest-content card">
        <h1>Find Your Perfect Game</h1>
        <p className="subtitle">Let us suggest the best game for your Game Night!</p>

        <form className="suggestion-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Number of Players</label>
              <select name="NumberPeople" value={formData.NumberPeople} onChange={handleInputChange}>
                <option value="">Select</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Group Objective</label>
              <select name="groupObjective" value={formData.groupObjective} onChange={handleInputChange}>
                <option value="">Select</option>
                {groupObjectives.map(objective => (
                  <option key={objective} value={objective}>{objective}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Game Type</label>
              <select name="gameType" value={formData.gameType} onChange={handleInputChange}>
                <option value="">Select</option>
                {gameTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Checkbox Fields */}
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={selectedCategory === "yourGames"}
                onChange={() => setSelectedCategory(selectedCategory === "yourGames" ? "" : "yourGames")}
              />
              From Your Board Games
            </label>

            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={selectedCategory === "allGames"}
                onChange={() => setSelectedCategory(selectedCategory === "allGames" ? "" : "allGames")}
              />
              All Board Games
            </label>
          </div>

          <button type="submit" className="submit-button">Suggest a Game</button>
        </form>
      </div>

      {/* Sidebar for Suggested Games */}
      <div className="suggest-sidebar">
        <h2 className="mb-4">Suggested Games</h2>
        <div className={`suggested-list ${isAnimating ? 'fade-in' : ''}`}>
          {filteredGames.map((game, index) => (
            <div key={game.name} className="suggested-card" style={{ animationDelay: `${index * 0.2}s` }}>
              <img src={game.image} alt={game.name} className="suggested-image" />
              <div>
                <h3>{game.name}</h3>
                <p>Type: {game.type}</p>
                <p>Objectives: {game.objectives.join(", ")}</p>
                <p>Players: {Array.isArray(game.players) ? `${game.players[0]}–${game.players[1]}` : game.players}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
