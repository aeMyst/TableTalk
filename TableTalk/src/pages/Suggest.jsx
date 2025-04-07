import React, { useState } from 'react'; 
import { Link } from "react-router-dom";
import "../elements/card.css";
import "./Suggest.css";
import Modal from "../components/Modal/Modal";

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
    gameDuration: '',
    gameComplexity: '' 
  });

  const [filteredGames, setFilteredGames] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gameTypes = ['Area Control', 'Abstract Strategy', 'Murder Mystery', 'Other'];

  // Removed "Cooperative" from group objectives
  const groupObjectives = ['Competitive', 'Casual', 'Party'];

  const gameDurations = [
    { value: '', label: 'Select' },
    { value: 'short', label: 'Short (<30 mins)' },
    { value: 'medium', label: 'Medium (30 - 60 mins)' },
    { value: 'long', label: 'Long (1-2 hours)' },
    { value: 'extended', label: 'Extended (>2 hours)' }
  ];

  const complexityLevels = [
    { value: '', label: 'Select' },
    { value: 'light', label: 'Light (Easy to Pick up)' },
    { value: 'medium', label: 'Medium (Requires Some Strategy)' },
    { value: 'heavy', label: 'Heavy (Complex Strategy)' }
  ];

  const allBoardGames = [
    {
      name: "Pandemic",
      type: "Cooperative",
      objectives: ["Casual"],
      players: [2, 4],
      image: PandemicImage,
      duration: 'medium',
      complexity: 'heavy',
      description: "Work together to cure diseases before they spread across the globe.",
      reviews: 115051,
      rules: "Players take on roles like Scientist and Medic to find cures for four diseases by collecting cards. Outbreaks and epidemics increase difficulty. The game ends when all cures are found or if outbreaks spiral out of control.",
      leaderboardRank: 4,
    },
    {
      name: "Catan",
      type: "Area Control",
      objectives: ["Casual"],
      players: [3, 6],
      image: CatanImage,
      duration: 'long',
      complexity: 'medium',
      description: "Build settlements, trade resources, and become the dominant force on the island of Catan.",
      reviews: 450051,
      rules: "Collect resource cards like wood, brick, and wheat to build roads, settlements, and cities. Trade strategically with other players to gain an advantage and win.",
      leaderboardRank: 2,
    },
    {
      name: "Chess",
      type: "Abstract Strategy",
      objectives: ["Competitive"],
      players: [2, 2],
      image: ChessImage,
      duration: 'short',
      complexity: 'heavy',
      description: "A classic strategy game where two players battle to checkmate their opponent's king.",
      reviews: 990516,
      rules: "Each piece moves in a unique way. Protect your king while attacking your opponent's pieces. The game ends when a king is checkmated.",
      leaderboardRank: 1,
    },
    {
      name: "Pandemic 2.0",
      type: "Cooperative",
      objectives: ["Casual"],
      players: [4, 4],
      image: Pandemic2Image,
      duration: 'medium',
      complexity: 'heavy',
      description: "An updated version of Pandemic with new roles, events, and challenges.",
      reviews: 42051,
      rules: "Cure diseases with new roles and events. Outbreaks and epidemics add complexity. Similar to the original Pandemic, but with additional roles and events.",
      leaderboardRank: 5,
    },
    {
      name: "Clue",
      type: "Murder Mystery",
      objectives: ["Casual", "Competitive"],
      players: [4, 8],
      image: ClueImage,
      duration: 'medium',
      complexity: 'light',
      description: "Solve the mystery of who killed Mr. Boddy, with what weapon, and in which room.",
      reviews: 6175,
      rules: "Players move around the mansion in turns, gathering clues to deduce the murderer, weapon, and location. The first to solve the mystery wins.",
      leaderboardRank: 7,
    },
    {
      name: "Exploding Kittens",
      type: "Other",
      objectives: ["Party", "Casual"],
      players: [4, 6],
      image: ExplodingKittensImage,
      duration: 'short',
      complexity: 'light',
      description: "A card game of strategy and luck where players try to avoid drawing an exploding kitten.",
      reviews: 6901,
      rules: "Players take turns drawing cards. If you draw an exploding kitten, you're out! Use action cards to avoid exploding or sabotage other players.",
      leaderboardRank: 6,
    },
    {
      name: "Ticket to Ride",
      type: "Area Control",
      objectives: ["Casual"],
      players: [4, 10],
      image: TicketToRideImage,
      duration: 'long',
      complexity: 'medium',
      description: "Build train routes across North America and complete destination tickets to score points.",
      reviews: 5051,
      rules: "Collect matching train cards to claim routes between cities. Complete destination tickets to earn bonus points. The player with the most points wins.",
      leaderboardRank: 8,
    },
    {
      name: "Monopoly",
      type: "Area Control",
      objectives: ["Competitive", "Casual"],
      players: [2, 8],
      image: MonopolyImage,
      duration: 'extended',
      complexity: 'medium',
      description: "Buy, trade, and build properties to bankrupt your opponents in this classic board game.",
      reviews: 289051,
      rules: "Roll the dice to move around the board. Buy properties, build houses and hotels, and charge rent to other players. The last player with money wins.",
      leaderboardRank: 3,
    },
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
    setIsModalOpen(true);
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


  // modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
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

    let gamesToFilter = selectedCategory === "yourGames" ? allBoardGames.slice(0, 4) : allBoardGames;

    const filteredGames = gamesToFilter.filter(game => {
      const { NumberPeople, groupObjective, gameType, gameDuration, gameComplexity } = formData;

      const isPlayerCountValid = !NumberPeople || 
        (Array.isArray(game.players) 
          ? game.players[0] <= parseInt(NumberPeople) && game.players[1] >= parseInt(NumberPeople) 
          : game.players === parseInt(NumberPeople));

      const isObjectiveValid = !groupObjective || game.objectives.includes(groupObjective);
      const isTypeValid = !gameType || game.type === gameType;
      const isDurationValid = !gameDuration || game.duration === gameDuration;
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
        <h2 className="mb-4">Suggested Games</h2>
        <div className={`suggested-list ${isAnimating ? 'fade-in' : ''}`}>
          {filteredGames.map((game, index) => (
            <Link 
              key={game.name} 
              to={`/game/${game.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="suggested-card" 
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseMove={(e) => handleCardHover(e, index)}
              onMouseLeave={() => handleCardLeave(index)}
              /*onClick={() => handleGameCardClick(game)}*/
            >
              <img src={game.image} alt={game.name} className="suggested-image" />
              <div className='gameDetails'>
                <h3>{game.name}</h3>
                <p>Type: {game.type}</p>
                <p>Objectives: {game.objectives.join(", ")}</p>
                <p>Players: {Array.isArray(game.players) ? `${game.players[0]}–${game.players[1]}` : game.players}</p>
                <p>Duration: {game.duration}</p>
                <p>Complexity: {game.complexity}</p>
              </div>
            </Link>
          ))}
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedGame && (
            <div className="relative modal-background p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-6">
              {/* Close Button */}
              <button 
                onClick={handleCloseModal} 
                className="absolute top-2 right-2 text-white hover:text-gray-700 text-xl p-2 rounded-full"
              >
                ✖
              </button>

              {/* Top Section: Game Name */}
              <h2 className="text-5xl font-bold text-white">{selectedGame.name}</h2>

              {/* Flex Container for Image and Game Details */}
              <div className="flex gap-6">
                {/* Game Image */}
                <img 
                  src={selectedGame.image} 
                  alt={selectedGame.name} 
                  className="w-72 h-72 object-cover rounded-lg" 
                />

                {/* Game Details, Review Button, and Leaderboard Rank */}
                <div className="space-y-4 w-64 mt-8">
                  
                  {/* Leaderboard Rank */}
                  <div className="flex items-center gap-2 mb-8">
                    <h3 className="text-2xl font-semibold text-white">Leaderboard Rank:</h3>
                    <p className="text-white text-lg">#{selectedGame.leaderboardRank}</p>
                  </div>
                  
                  {/* Game Details */}
                  <div className="space-y-2">
                    <p><strong className="text-lg">Type:</strong> {selectedGame.type}</p>
                    <p><strong className="text-lg">Objectives:</strong> {selectedGame.objectives.join(", ")}</p>
                    <p><strong className="text-lg">Players:</strong> {Array.isArray(selectedGame.players) ? `${selectedGame.players[0]}–${selectedGame.players[1]}` : selectedGame.players}</p>
                  </div>

                  {/* Review Button */}
                  <div>
                    <button
                      onClick={() => {
                        setSelectedGame((prev) => ({
                          ...prev,
                          reviews: prev.reviewsClicked ? prev.reviews - 1 : prev.reviews + 1,
                          reviewsClicked: !prev.reviewsClicked,
                        }));
                      }}
                      className="modal-dark text-white text-lg px-4 py-2 rounded-md hover:modal-light transition"
                    >
                      {selectedGame.reviewsClicked ? "Community ❤️: " : "Community 🖤: "} ({selectedGame.reviews})
                    </button>
                  </div>

                </div>
              </div>

              {/* Description & Rules */}
              <div className="w-full space-y-4">
                <h3 className="text-2xl font-semibold text-white">Description</h3>
                <p className="text-white">{selectedGame.description}</p>
                <h3 className="text-2xl font-semibold text-white">Game Rules</h3>
                <p className="text-white">{selectedGame.rules}</p>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </div>
  );
}
