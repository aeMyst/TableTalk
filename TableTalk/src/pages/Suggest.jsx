import React, { useState } from 'react'; 
import { Link } from "react-router-dom";
import "../elements/card.css";
import "./Suggest.css";
import boardGames from "../database/gamesData.jsx"; 


export default function Suggest() {
  const [formData, setFormData] = useState({
    NumberPeople: '',
    groupObjective: '',
    gameType: '',
    gameDuration: '',
    gameComplexity: '' 
  });

  const [filteredGames, setFilteredGames] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);

  const gameTypes = [...new Set(boardGames.map(game => game.type))];

  // Removed "Cooperative" from group objectives
  const groupObjectives = ['Competitive', 'Casual'];

  const gameDurations = [
    { value: '', label: 'Select Game Duration' },
    { value: 'Short', label: 'Short (<30 mins)' },
    { value: 'Medium', label: 'Medium (30 - 60 mins)' },
    { value: 'Long', label: 'Long (1-2 hours)' },
    { value: 'Extended', label: 'Extended (>2 hours)' }
  ];

  const complexityLevels = [
    { value: '', label: 'Select Complexity Level' },
    { value: 'Light', label: 'Light (Easy to Pick up)' },
    { value: 'Medium', label: 'Medium (Requires Some Strategy)' },
    { value: 'Heavy', label: 'Heavy (Complex Strategy)' }
  ];

  const handleClearForm = () => {
    setFormData({
      NumberPeople: '',
      groupObjective: '',
      gameType: '',
      gameDuration: '',
      gameComplexity: '' 
    });
    setSelectedCategory("");
  };

  
  const handleGameCardClick = (game) => {
    setSelectedGame(game);
  };

  // const handleGameCardClick = (game) => {
  //   // Convert game name to URL-friendly format (same as in your GameDetails page)
  //   const gameUrl = game.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  //   navigate(`/games/${gameUrl}`);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const [hoverStates, setHoverStates] = useState({});

  const handleCardHover = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setHoverStates(prev => ({
      ...prev,
      [index]: {
        rotateX: ((y - centerY) / centerY) * 5,
        rotateY: ((centerX - x) / centerX) * 5,
        translateZ: 20
      }
    }));
  };

  const handleCardLeave = (index) => {
    setHoverStates(prev => ({
      ...prev,
      [index]: {
        rotateX: 0,
        rotateY: 0,
        translateZ: 0
      }
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnimating(true);
  
    const filteredGames = boardGames.filter(game => {
      const { NumberPeople, groupObjective, gameType, gameDuration, gameComplexity } = formData;
  
      // Convert maxPlayers to a range
      const playerRange = [2, game.maxPlayers]; // minimum 2 players
      
      const isPlayerCountValid = !NumberPeople || 
        (playerRange[0] <= parseInt(NumberPeople) && playerRange[1] >= parseInt(NumberPeople));
  
      const isObjectiveValid = !groupObjective || game.objective === groupObjective;
      const isTypeValid = !gameType || game.type === gameType;
      const isDurationValid = !gameDuration || game.duration.includes(gameDuration);
      const isComplexityValid = !gameComplexity || game.complexity === gameComplexity;
  
      return isPlayerCountValid && isObjectiveValid && isTypeValid && isDurationValid && isComplexityValid;
    });
  
    // Select a maximum of 5 games
    const limitedGames = filteredGames.length > 5
      ? filteredGames.sort(() => 0.5 - Math.random()).slice(0, 5)
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
                <option value="">Select Number of Players</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Group Objective</label>
              <select name="groupObjective" value={formData.groupObjective} onChange={handleInputChange}>
                <option value="">Select Group Objective</option>
                {groupObjectives.map(objective => (
                  <option key={objective} value={objective}>{objective}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Game Type</label>
              <select name="gameType" value={formData.gameType} onChange={handleInputChange}>
                <option value="">Select Game Type</option>
                {gameTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Game Duration</label>
              <select 
                name="gameDuration" 
                value={formData.gameDuration} 
                onChange={handleInputChange}
              >
                {gameDurations.map(duration => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Game Complexity</label>
              <select 
                name="complexity" 
                value={formData.complexity} 
                onChange={handleInputChange}
              >
                {complexityLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* <label>Board Games Selection</label> */}

          {/* Checkbox Fields */}
          <div className="single-toggle-container">
            <label className={`toggle-option ${selectedCategory !== "yourGames" ? "active" : ""}`}>
              All Board Games
            </label>
            
            <label className="single-toggle-switch">
              <input 
                type="checkbox"
                checked={selectedCategory === "yourGames"}
                onChange={() => setSelectedCategory(selectedCategory === "yourGames" ? "" : "yourGames")}
              />
              <span className="slider"></span>
            </label>
            
            <label className={`toggle-option ${selectedCategory === "yourGames" ? "active" : ""}`}>
              Your Games
            </label>
          </div>

{/*           <div className="mt-2 mb-2">
            <div className="flex items-center justify-center gap-3">
              <span className={`ml-8 text-base font-medium w-18 text-right ${selectedCategory !== "yourGames" ? "text-[#3B3F97] bg-[#f0f0f0] rounded-[5px]" : "text-gray-500"}`}>
                All Games
              </span>

              <div className={`w-36 aspect-video rounded-lg bg-[#ebe6ef] border-2 border-[#121331]`}>
                <div className="flex h-full w-full px-1.5 items-center gap-x-1.5">
                  <div className="w-4 h-4 flex-shrink-0 rounded-full border-2 border-[#121331]"></div>
                  <label
                    htmlFor="creativeSwitch"
                    className={`${selectedCategory === "yourGames" ? "scale-x-[-1]" : ""} w-full h-7 border-2 border-[#121331] rounded cursor-pointer`}
                  >
                    <input 
                      type="checkbox" 
                      id="creativeSwitch" 
                      className="hidden" 
                      checked={selectedCategory === "yourGames"}
                      onChange={() => setSelectedCategory(selectedCategory === "yourGames" ? "" : "yourGames")}
                    />
                    <div className="w-full h-full bg-[#5781CB] relative">
                      <div className="w-0 h-0 z-20 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[15px] border-t-[#121331] relative">
                        <div className="w-0 h-0 absolute border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[12px] border-t-[#3B3F97] -top-[15px] -left-[14px]"></div>
                      </div>
                      <div className="w-[18px] h-6 z-10 absolute top-[6px] left-0 bg-[#5781CB] border-r border-b-2 border-[#121331] transform skew-y-[39deg]"></div>
                      <div className="w-[19px] h-6 z-10 absolute top-[6px] left-[18px] bg-[#3B3F97] border-r-2 border-l border-b-2 border-[#121331] transform skew-y-[-39deg]"></div>
                    </div>
                  </label>
                  <div className="w-4 h-0.5 flex-shrink-0 bg-[#121331] rounded-full"></div>
                </div>
              </div>

              <span className={`text-base font-medium w-22 text-left ${selectedCategory === "yourGames" ? "text-[#3B3F97] bg-[#f0f0f0] rounded-[5px]" : "text-gray-500"}`}>
                Your Games
              </span>
            </div>
          </div> */}
          <div className="form-buttons">
            <button type="submit" className="submit-button">Suggest a Game</button>
            <button type="button" onClick={handleClearForm} className="clear-button">Clear Filters</button>
          </div>
        </form>
      </div>

      {/* Sidebar for Suggested Games */}
      <div className="suggest-sidebar">
        <h2 className="mb-1">Suggested Games</h2>
        <div className={`suggested-list ${isAnimating ? 'fade-in' : ''}`}>
        {filteredGames.map((game, index) => (
          <Link 
            key={game.name} 
            to={`/game/${game.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="suggested-card" 
            style={{ animationDelay: `${index * 0.2}s` }}
            onMouseMove={(e) => handleCardHover(e, index)}
            onMouseLeave={() => handleCardLeave(index)}
          >
            <img src={game.image} alt={game.name} className="suggested-image" />
            <div className='gameDetails'>
              <h3>{game.name}</h3>
              <p><span className="custom-font-label">Type:</span> {game.type}</p>
              <p><span className="custom-font-label">Objective:</span> {game.objective}</p>
              <p><span className="custom-font-label">Max Players:</span> {game.maxPlayers}</p>
              <p><span className="custom-font-label">Duration:</span> {game.duration}</p>
              <p><span className="custom-font-label">Complexity:</span> {game.complexity}</p>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}
