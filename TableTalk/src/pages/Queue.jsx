import React, { useState } from 'react';
import "../elements/tall-card.css";
import "../pages/Queue.css";

export default function Queue() {
  const [rangeValue, setRangeValue] = useState(0);

  const handleInputChange = (e) => {
    setRangeValue(e.target.value);
  };

  return (
    <div className="container">
      <div className="options-container">
        <div className="tall-card">
          <h1>Options</h1>
          <form>
            <button className="queue-button">Edit Preferences</button>
            <button className="queue-button">Privacy Settings</button>
            <button className="queue-button">Match History</button>
          </form>
        </div>
      </div>

      <div className="search-container">
        <div className="tall-card">
          <h1>Find people to play with!</h1>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="fname" /><br />

            <label htmlFor="gametypes">Game Type</label>
            <select name="Game Types" id="gametypes"><br />
              <option value="competitive">Competitive</option>
              <option value="competitive">Casual</option>
            </select><br />

            <label htmlFor="range">Distance</label>
            <input
              type="range"
              id="range"
              max="10"
              defaultValue="0"
              onInput={handleInputChange}
            />
            <output htmlFor="range">{rangeValue} km</output>
          </form><br></br>
          <input type="submit"></input>
        </div>
      </div>

      <div className="matches-container">
        <div className="tall-card">
          <h1>Matches For You</h1>
        </div>
      </div>
    </div>
  );
}
