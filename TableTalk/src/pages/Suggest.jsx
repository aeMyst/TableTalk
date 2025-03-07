import React, { useState } from 'react';
import "../elements/card.css";
import "./Suggest.css";

export default function Suggest() {
  const [formData, setFormData] = useState({
    NumberPeople: '',
    gameDuration: '',
    gameType: '',
    location: '',
    description: '',
    features: {
      ownGames: false,
      databaseGames: false,
      glutenFree: false,
      parking: false,
      delivery: false,
      takeout: false
    }
  });

  const [filteredGames, setFilteredGames] = useState([]);  // New state for filtered games

  const gameTypes = [
    'Cooperative',
    'Area Control',
    'Abstract Strategy',
    'Murder Mystery',
    'Other'
  ];

  const gameDurations = [
    'Less than 30 mins',
    'Around an Hour',
    'A few hours',
    'A couple days (or more)'
  ];

  const allGames = [
    { name: "Pandemic", type: "Cooperative", duration: "Around an Hour", players: [2, 4] },
    { name: "Catan", type: "Area Control", duration: "A few hours", players: [3, 6] },
    { name: "Chess", type: "Abstract Strategy", duration: "Less than 30 mins", players: 2 },
    { name: "Pandemic 2.0 (Expanded and Enhanced)", type: "Cooperative", duration: "Around an Hour", players: 4 },
    { name: "Clue", type: "Murder Mystery", duration: "Around an Hour", players: [4, 8] },
    { name: "Exploding Kittens", type: "Cooperative", duration: "Less than 30 mins", players: [4, 6] },
    { name: "Ticket to Ride", type: "Area Control", duration: "A few hours", players: [4, 10] },
    { name: "Monopoly", type: "Area Control", duration: "A couple days (or more)", players: [2, 8] },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Filter games
    const filteredGames = allGames.filter(game => {
      const { NumberPeople, gameDuration, gameType } = formData;
      const isPlayerCountValid =
      !NumberPeople ||
      (Array.isArray(game.players)
        ? game.players[0] <= parseInt(NumberPeople) && game.players[1] >= parseInt(NumberPeople) // Range
        : game.players === parseInt(NumberPeople)); // Fixed

      const isDurationValid = !gameDuration || game.duration === gameDuration;
      const isTypeValid = !gameType || game.type === gameType;

      return isPlayerCountValid && isDurationValid && isTypeValid;
    });

    setFilteredGames(filteredGames);
    console.log('Filtered Games:', filteredGames); 
  };


  return (
    <div className="suggest-container">
      <div className="card">
        <h1>Game Board Suggestions</h1>
        <p className="subtitle">Let us help you what to bring to your Game Night!</p>

        <form className="suggestion-form" onSubmit={handleSubmit}>
          <div className="form-section">
          <div className="form-row">
              <div className="form-group">
                <label htmlFor="NumberPeople">Number of People</label>
                <select
                  id="NumberPeople"
                  name="NumberPeople"
                  value={formData.NumberPeople}
                  onChange={handleInputChange}
                  required
                ><option value="">How many players?</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              </div>

              <div className="form-group">
                <label htmlFor="gameDuration">Group Objective</label>
                <select
                  id="gameDuration"
                  name="gameDuration"
                  value={formData.gameDuration}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Game Duration</option>
                  {gameDurations.map(gameDuration => (
                    <option key={gameDuration} value={gameDuration}>
                      {gameDuration}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="gameType">Game Type</label>
                <select
                  id="gameType"
                  name="gameType"
                  value={formData.gameType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select The Game Type</option>
                  {gameTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="form-section">
            <div className="checkbox-grid">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="ownGames"
                  checked={formData.features.ownGames}
                  onChange={handleCheckboxChange}
                />
                From Your Games
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="databaseGames"
                  checked={formData.features.databaseGames}
                  onChange={handleCheckboxChange}
                />
                From Games Database
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Submit Suggestion
            </button>
          </div>
        </form>


        <div className="suggested-games">
          <h2>Suggested Games</h2>
          <div className="games-grid">
            {filteredGames.map(game => (
              <div key={game.name} className="game-card">
                <h3>{game.name}</h3>
                <p>Type: {game.type}</p>
                <p>Duration: {game.duration}</p>
                <p>
                  Players: {Array.isArray(game.players)
                    ? `${game.players[0]}–${game.players[1]}` // range
                    : game.players} {/* fixed number */}
                </p>              
              </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 