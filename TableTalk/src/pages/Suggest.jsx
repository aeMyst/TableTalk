import React, { useState } from 'react';
import "../elements/card.css";
import "./Suggest.css";

export default function Suggest() {
  const [formData, setFormData] = useState({
    NumberPeople: '',
    cuisine: '',
    priceRange: '',
    location: '',
    description: '',
    features: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      parking: false,
      delivery: false,
      takeout: false
    }
  });

  const cuisineTypes = [
    'Italian',
    'Japanese',
    'Chinese',
    'Mexican',
    'Indian',
    'American',
    'Mediterranean',
    'Thai',
    'French',
    'Other'
  ];

  const priceRanges = [
    '$: Under $15',
    '$$: $15-$30',
    '$$$: $31-$60',
    '$$$$: Above $60'
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
  };

  return (
    <div className="suggest-container">
      <div className="card">
        <h1>Game Board Suggestions</h1>
        <p className="subtitle">Let us help you what to bring to your Game Night!</p>

        <form className="suggestion-form" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="form-section">
          
            <div className="form-group">
              <label htmlFor="NumberPeople">Number of People</label>
              <input
                type="text"
                id="NumberPeople"
                name="NumberPeople"
                value={formData.NumberPeople}
                onChange={handleInputChange}
                required
                placeholder="Enter restaurant name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cuisine">Group Objective</label>
                <select
                  id="cuisine"
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Group Objective</option>
                  {cuisineTypes.map(cuisine => (
                    <option key={cuisine} value={cuisine.toLowerCase()}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priceRange">Game Type</label>
                <select
                  id="priceRange"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select The Game Type</option>
                  {priceRanges.map(range => (
                    <option key={range} value={range.split(':')[0]}>
                      {range}
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
                  name="vegetarian"
                  checked={formData.features.vegetarian}
                  onChange={handleCheckboxChange}
                />
                From Your Games
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="vegan"
                  checked={formData.features.vegan}
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
      </div>
    </div>
  );
} 