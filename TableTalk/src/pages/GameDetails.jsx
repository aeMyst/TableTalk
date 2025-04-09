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
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  //const [likes, setLikes] = useState(0);

  // Find the game in the database
  const game = boardGames.find(g => 
    g.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === gameName
  );

  if (!game) {
    return <h1 className="not-found">Game not found.</h1>;
  }

  const [likes, setLikes] = useState(game.likes || 0);

  const [newReview, setNewReview] = useState({
    text: '',
    rating: 0,
    author: 'You', // or get from user auth
    date: new Date().toLocaleDateString()
  });

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    setLikes(prevLikes => newFavoriteState ? prevLikes + 1 : prevLikes - 1);
  };

  const handleReviewNav = (direction) => {
    // exit animation
    setAnimation(direction > 0 ? 'slide-out-right' : 'slide-out-left');
    
    // Wait for exit animation to complete
    setTimeout(() => {
      setCurrentReviewIndex(prev => {
        if (direction > 0) {
          return prev === game.reviews.length - 1 ? 0 : prev + 1;
        } else {
          return prev === 0 ? game.reviews.length - 1 : prev - 1;
        }
      });
      // enter animation
      setAnimation(direction > 0 ? 'slide-in-left' : 'slide-in-right');
    }, 250);
  };

  const handleSubmitReview = () => {
    if (!newReview.text || newReview.rating === 0) return;
    
    // Update the game's reviews array (will figure out how to add it to the dataset later)
    const updatedGame = {
      ...game};
    if (editingReview !== null) {
      // Update existing review
      updatedGame.reviews[editingReview] = newReview;
    } else {
      // Add new review
      updatedGame.reviews = [...game.reviews, newReview];
    }
    // Find the game index and update in boardGames
    const gameIndex = boardGames.findIndex(g => g.name === game.name);
    boardGames[gameIndex] = updatedGame;
    
    // Reset form and hide it
    setNewReview({
      text: '',
      rating: 0,
      author: 'You',
      date: new Date().toLocaleDateString()
    });
    setShowReviewForm(false);
    setEditingReview(null);
    setHasSubmittedReview(true); // Mark that user has submitted a review

    // Update state to show the new review
    setCurrentReviewIndex(editingReview !== null ? editingReview : updatedGame.reviews.length - 1);
  };

  return (
    <div className="game-details-container card">

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
            <div className="reviews-header">
              <h2>Reviews</h2>
              {game.reviews.length > 0 && (
                <div className="review-nav-buttons">
                  <button 
                    className="review-nav prev"
                    onClick={() => handleReviewNav(-1)}
                    aria-label="Previous review"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <button 
                    className="review-nav next"
                    onClick={() => handleReviewNav(1)}
                    aria-label="Next review"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className="review-content">
            {!showReviewForm && (
              <>
                {game.reviews.length > 0 ? (
                  game.reviews.map((review, index) => (
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
                        {/* Show edit button only for the user's review */}
                        {review.author === "You" && ( // not needed now but replace "You" with user auth check
                            <button 
                              className="edit-review-button"
                              onClick={() => {
                                setNewReview({...review});
                                setEditingReview(index);
                                setShowReviewForm(true);
                              }}
                            >  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '4px'}}>
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                              Edit
                            </button>
                          )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews">
                    <p>No reviews yet. Be the first to review this game!</p>
                  </div>
                )}
              </>
            )}
              {!showReviewForm && !hasSubmittedReview && (
                <div className="write-review-section">
                  <button 
                    className="write-review-button"
                    onClick={() => {setShowReviewForm(true); setEditingReview(null);
                    }}
                  >
                    <span className="review-plus-button">+</span> Write a Review
                  </button>
                </div>
              )}

              {showReviewForm && (
                <div className="review-form">
                  <textarea
                    value={newReview.text}
                    onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                    placeholder="Share your thoughts about this game..."
                  />
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${star <= newReview.rating ? 'filled' : ''}`}
                        onClick={() => setNewReview({...newReview, rating: star})}
                      >
                        {star <= newReview.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <div className="form-actions">
                    <button onClick={() => setShowReviewForm(false)}>Cancel</button>
                    <button 
                      className="submit-review"
                      onClick={handleSubmitReview}
                      disabled={!newReview.text || newReview.rating === 0}
                    >
                      {editingReview !== null ? "Submit Edit" : "Submit Review"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
