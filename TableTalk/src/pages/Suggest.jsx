import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';
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
import filterImage from '../assets/loadingImages/boards.svg';
import loadingImage from '../assets/loadingImages/dice.svg';


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
    }
  });

  const [filteredGames, setFilteredGames] = useState([]);  // New state for filtered games
  const [selectedGame, setSelectedGame] = useState(null); // Track the selected game
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal
  const [isSubmitted, setIsSubmitted] = useState(false);


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
    { name: "Pandemic", type: "Cooperative", duration: "Around an Hour", players: [2, 4], image: PandemicImage },
    { name: "Catan", type: "Area Control", duration: "A few hours", players: [3, 6], image: CatanImage },
    { name: "Chess", type: "Abstract Strategy", duration: "Less than 30 mins", players: 2, image: ChessImage },
    { name: "Pandemic 2.0 (Covid-19 Edition)", type: "Cooperative", duration: "Around an Hour", players: 4, image: Pandemic2Image },
    { name: "Clue", type: "Murder Mystery", duration: "Around an Hour", players: [4, 8], image: ClueImage },
    { name: "Exploding Kittens", type: "Cooperative", duration: "Around an Hour", players: [4, 6], image: ExplodingKittensImage },
    { name: "Ticket to Ride", type: "Cooperative", duration: "Around an Hour", players: [4, 10], image: TicketToRideImage },
    { name: "Monopoly", type: "Area Control", duration: "A couple days (or more)", players: [2, 8], image: MonopolyImage },
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
    setIsSubmitted(true); // Set isSubmitted to true
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

  // game-card click
  const handleGameClick = (game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  // modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <div className="suggest-container">
      <div className="card bg-white p-6 rounded-lg shadow-md mx-auto h-full">
      <h1 className="text-4xl font-bold text-gray-700 mb-4 mt-1">Game Board Suggestions</h1>
      <p className="subtitle text-base text-gray-600 mb-8">Let us help you what to bring to your Game Night!</p>

        <form className="suggestion-form" onSubmit={handleSubmit}>
          <div className="form-section">
          <div className="form-row">
              <div className="form-group">
              <label htmlFor="NumberPeople" className="block text-sm font-medium text-gray-700 mb-1">Number of People</label>
                <select
                  id="NumberPeople"
                  name="NumberPeople"
                  value={formData.NumberPeople}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ><option value="">How many players?</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              </div>

              <div className="form-group">
              <label htmlFor="gameDuration" className="block text-sm font-medium text-gray-700 mb-1">Group Objective</label>
                <select
                  id="gameDuration"
                  name="gameDuration"
                  value={formData.gameDuration}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label htmlFor="gameType" className="block text-sm font-medium text-gray-700 mb-1">Game Type</label>
                <select
                  id="gameType"
                  name="gameType"
                  value={formData.gameType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="form-section mb-2">
            <div className="checkbox-grid">
            <label className="checkbox-label flex items-center">
                <input
                  type="checkbox"
                  name="ownGames"
                  checked={formData.features.ownGames}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <span className="text-base text-gray-800">From Your Games</span>
              </label>
              <label className="checkbox-label flex items-center">
                <input
                  type="checkbox"
                  name="databaseGames"
                  checked={formData.features.databaseGames}
                  onChange={handleCheckboxChange}
                  className="ml-2"
                />
                <span className="text-base text-gray-800">From Games Database</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
          <button type="submit" className="submit-button w-3/12 bg-gray-800 text-lg text-white py-2 px-4 rounded-md hover:bg-red-900 transition-colors mb-4">
              Submit Suggestion
            </button>
          </div>
        </form>


        <div className="suggested-games">
          {filteredGames.length === 0 ? (
            !isSubmitted ? (
              // First state: Before the submit button is pressed
              <div className="flex flex-col items-center justify-center gap-4">
                <img
                  src={loadingImage} // Replace with the path to your image
                  alt="Start searching"
                  className="mt-8 w-36 h-36 object-cover my-2 opacity-50 -rotate-12"
                />
                <p className="text-gray-500 text-base font-medium">Start your search to find great games!</p>
              </div>
            ) : (
              // Second state: No games found after submission
              <div className="flex flex-col items-center justify-center gap-4">
                <img
                  src={filterImage} // Replace with the path to your image
                  alt="No games found"
                  className="mt-8 w-36 h-36 object-cover my-2 opacity-45 -rotate-12"
                />
                <p className="text-gray-500 text-base font-medium">No games found. Try to broaden your horizon!</p>
              </div>
            )
          ) : (
            // Third state: Games are found
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Suggested Games</h2>
              <div className="games-grid">
                {filteredGames.map((game) => (
                  <div
                    key={game.name}
                    className="game-card border border-gray-200 rounded-lg p-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition-transform cursor-pointer"
                    onClick={() => handleGameClick(game)}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{game.name}</h3>
                    <p className="text-gray-600">Type: {game.type}</p>
                    <p className="text-gray-600">Duration: {game.duration}</p>
                    <p className="text-gray-600">
                      Players: {Array.isArray(game.players)
                        ? `${game.players[0]} – ${game.players[1]}` // Range
                        : game.players} {/* Fixed number */}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Modal for selected game */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedGame && (
          <>
            <img src={selectedGame.image} alt={selectedGame.name} className="modal-image" />
            <div className="modal-right">
              {/* Game Details */}
              <div className="game-details">
              <button onClick={handleCloseModal} className="absolute text-xl top-2 right-2 text-gray-500 hover:text-gray-700 p-2 rounded-full transition"> ✖ </button>
                <h3>{selectedGame.name}</h3>
                <p>Type: {selectedGame.type}</p>
                <p>Duration: {selectedGame.duration}</p>
                <p>
                  Players: {Array.isArray(selectedGame.players)
                    ? `${selectedGame.players[0]} – ${selectedGame.players[1]}` // Range
                    : selectedGame.players} {/* Fixed number */}
                </p>
              </div>

              {/* Button Options */}
              <div className="modal-buttons">
                <button onClick={() => alert(`Added ${selectedGame.name} to database!`)}>
                  Add to Database
                </button>
                <button onClick={() => alert(`Redirecting to rules for ${selectedGame.name}...`)}>
                  See Game Rules
                </button>
              </div>
          </div>
          </>
        )}
      </Modal>
    </div>
  );
} 