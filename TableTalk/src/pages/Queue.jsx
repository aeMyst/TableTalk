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
      <div className="friends-container">
        <div className="tall-card-blue">
          <h1>Friends</h1>
          <form>
            <div className="match-card">
              <h2 class="textstyle">Ben Fren</h2>
              <r1>Friend since March 2nd</r1><br></br>
              <r2>1 unread message</r2><br></br><br></br>
              <button className="match-button">Message</button>
              <button className="match-button" onClick={(e) => removeDiv(e.target)}>Unfriend</button>
            </div>
            <div className="match-card">
              <h2 class = "textstyle">Bud Dee</h2>
              <r1>Friends since February 14</r1><br></br>
              <r2>No unread messages</r2><br></br><br></br>
              <button className="match-button">Message</button>
              <button className="match-button" onClick={(e) => removeDiv(e.target)}>Unfriend</button>
            </div>
            <div className="match-card">
              <h2 class = "textstyle">Quinten Quaintance</h2>
              <r1>Friends since July 9</r1><br></br>
              <r2>3 unread messages</r2><br></br><br></br>
              <button className="match-button">Message</button>
              <button className="match-button" onClick={(e) => removeDiv(e.target)}>Unfriend</button>
            </div>
          </form>
        </div>
      </div>

      <div className="search-container">
        <div className="tall-card">
          <h1>Find people to play with!</h1>
          <r1>Search for new people using these filters. All fields are optional.</r1>
          <form>
            <label htmlFor="name">Their Name</label>
            <input type="text" id="name" name="fname" className="form-control" /><br />

            <label htmlFor="gametypes">Their Game Type Preferences</label>
            <select name="Game Types" id="gametypes" className="form-control"><br />
            <option value="none">None Chosen</option>
              <option value="competitive">Competitive</option>
              <option value="casual">Casual</option>  
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
          <input type="submit" value="Search"></input>
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
