import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import boardGames from "../database/gamesData.jsx";
import "./GameDetails.css"; 

export default function GameDetails() {
  const { gameName } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [animation, setAnimation] = useState('');
  //const [likes, setLikes] = useState(0);

  // Find the game in the database
  const game = boardGames.find(g => 
    g.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === gameName
  );

  if (!game) {
    return <h1 className="not-found">Game not found.</h1>;
  }

  const [likes, setLikes] = useState(game.likes || 0);

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    setLikes(prevLikes => newFavoriteState ? prevLikes + 1 : prevLikes - 1);
  };

  const handleReviewNav = (direction) => {
    // Set exit animation
    setAnimation(direction > 0 ? 'slide-out-right' : 'slide-out-left');
    
    // Wait for exit animation to complete before changing index
    setTimeout(() => {
      setCurrentReviewIndex(prev => {
        if (direction > 0) {
          return prev === game.reviews.length - 1 ? 0 : prev + 1;
        } else {
          return prev === 0 ? game.reviews.length - 1 : prev - 1;
        }
      });
      // Set enter animation
      setAnimation(direction > 0 ? 'slide-in-left' : 'slide-in-right');
    }, 250); // Matches CSS transition time
  };

  return (
    <div className="game-details-container card">

      {/* Back Button - Now at top left */}
      <button className="back-button" onClick={() => navigate(-1)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
        Back
      </button>
      <h1 className="game-title">{game.name}</h1>
      
      <div className="content-container">

        {/* Left Section: Game Image, Basic Info, Likes */}
        <div className="left-section">
          <img src={game.image} alt={game.name} className="game-details-image" />
          
          <div className="game-info">
            <p><strong>Type:</strong> {game.type}</p>
            <p><strong>Objective:</strong> {game.objective}</p>
            <p><strong>Difficulty:</strong> {game.difficulty}</p>
            <p><strong>Maximum Players:</strong> {game.maxPlayers}</p>
            <p><strong>Complexity:</strong> {game.complexity}</p>
            <p><strong>Duration:</strong> {game.duration}</p>
          </div>

          {/* Like Section */}
          <div className="favorite-container">
            <input 
              type="checkbox" 
              id="favorite" 
              checked={isFavorite}
              onChange={handleFavoriteClick}
            />
            <label htmlFor="favorite" className="favorite-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <div className="action">
                <span className="option-1">Community Likes: {likes}</span>
                <span className="option-2">Community Likes: {likes}</span>
              </div>
            </label>
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
          
          {/* Game Reviews */}
          <div className="game-reviews">
            <h2>Reviews</h2>
            {game.reviews.length > 0 && (
              <>
                <button 
                  className="review-nav prev"
                  onClick={() => handleReviewNav(-1)}
                  aria-label="Previous review"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                
                <div className="review-content">
                  {game.reviews.map((review, index) => (
                    <div 
                      key={index}
                      className={`review-text ${
                        index === currentReviewIndex
                          ? animation.includes('in') 
                            ? animation 
                            : ''
                          : index < currentReviewIndex 
                            ? 'slide-out-left'
                            : 'slide-out-right'
                      }`}
                      style={{
                        display: index === currentReviewIndex ? 'block' : 'none'
                      }}
                    >
                      <p>"{review.text}"</p>
                      <div className="rating-and-author">
                        <div className="review-rating">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
                        </div>
                        <div className="review-author">
                          - {review.author}
                          {review.date && <span className="review-date"> • {review.date}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="review-nav next"
                  onClick={() => handleReviewNav(1)}
                  aria-label="Next review"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>


    </div>
  );
}
