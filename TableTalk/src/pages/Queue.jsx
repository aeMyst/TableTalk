import React, { useState } from 'react';
import "../elements/tall-card.css";
import "../pages/Queue.css";

export default function Queue() {
  const [rangeValue, setRangeValue] = useState(0);

  const handleInputChange = (e) => {
    setRangeValue(e.target.value);
  };
  
  const removeDiv = (btn) => {
    ((btn.parentNode).parentNode).removeChild(btn.parentNode);
  };


  return (


    <div className="container">
      <div className="options-container">
        <div className="tall-card-blue">
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
            <input type="text" id="name" name="fname" className="form-control" /><br />

            <label htmlFor="gametypes">Game Type</label>
            <select name="Game Types" id="gametypes" className="form-control"><br />
              <option value="competitive">Competitive</option>
              <option value="competitive">Casual</option>
            </select><br />

            <label htmlFor="range">Distance</label>
            <input
              type="range"
              id="range"
              max="200"
              defaultValue="0"
              onInput={handleInputChange}
            />
            <output htmlFor="range">{rangeValue} km</output>
          </form><br></br>
          <input type="submit"></input>
        </div>
      </div>

      <div className="matches-container">
        <div className="tall-card-blue">
          <h1>Matches For You</h1>
          <form>
            <div className="match-card">
              <h2 class="textstyle">Joe Shmoe</h2>
              <r1>You both like Competitive Games</r1><br></br>
              <r2>You both own Pandemic</r2><br></br><br></br>
              <button className="match-button">Message</button>
              <button className="match-button" onClick={(e) => removeDiv(e.target)}>Ignore</button>
            </div>
            <div className="match-card">
              <h2 class = "textstyle">James Games</h2>
              <r1>You're only 20 km away</r1><br></br>
              <r2>You both like Strategy Games</r2><br></br><br></br>
              <button className="match-button">Message</button>
              <button className="match-button" onClick={(e) => removeDiv(e.target)}>Ignore</button>
            </div>
            <div className="match-card">
              <h2 class = "textstyle">Jess Chess</h2>
              <r1>You're both friends with Hannah Montana</r1><br></br>
              <r2>You both like Strategy Games</r2><br></br><br></br>
              <button className="match-button">Message</button>
              <button className="match-button" onClick={(e) => removeDiv(e.target)}>Ignore</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
