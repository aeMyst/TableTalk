import React, { useState } from 'react'; 
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
  });

  const [filteredGames, setFilteredGames] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gameTypes = ['Area Control', 'Abstract Strategy', 'Murder Mystery', 'Other'];

  // Removed "Cooperative" from group objectives
  const groupObjectives = ['Competitive', 'Casual', 'Party'];

  const allBoardGames = [
    {
      name: "Pandemic",
      type: "Cooperative",
      objectives: ["Casual"],
      players: [2, 4],
      image: PandemicImage,
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
      description: "Buy, trade, and build properties to bankrupt your opponents in this classic board game.",
      reviews: 289051,
      rules: "Roll the dice to move around the board. Buy properties, build houses and hotels, and charge rent to other players. The last player with money wins.",
      leaderboardRank: 3,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGameCardClick = (game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  // modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
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
            <div 
              key={game.name} 
              className="suggested-card" 
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => handleGameCardClick(game)}
            >
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
