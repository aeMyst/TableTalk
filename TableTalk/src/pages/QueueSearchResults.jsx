// THIS PAGE WILL EVENTUALLY BE LINKED TO QUEUE.JSX

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
          <h1>Search Results:</h1>
          <form>
            <div className="rounded-card">
                <h2 class = "textstyle">Sarah Serched</h2><br></br>
                <r1>Prefers Competitive Games</r1><br></br>
                <r2>Prefers Strategy Games</r2><br></br>
                <r3>122 km away</r3><br></br><br></br>
                <button className="match-button">Message</button>
                <button className="match-button" onClick={(e) => removeDiv(e.target)}>Ignore</button>
                </div>

                <div className="rounded-card">
                <h2 class = "textstyle">Freddy Found</h2><br></br>
                <r1>Prefers Competitive Games</r1><br></br>
                <r2>Prefers Murder Mystery Games</r2><br></br>
                <r3>1 km away</r3><br></br><br></br>
                <button className="match-button">Message</button>
                <button className="match-button" onClick={(e) => removeDiv(e.target)}>Ignore</button>
                </div>    

            <div className="rounded-card">
                <h2 class = "textstyle">Rebecca Result</h2><br></br>
                <r1>Prefers Competitive Games</r1><br></br>
                <r2>Prefers Area Control Games</r2><br></br>
                <r3>55 km away</r3><br></br><br></br>
                <button className="match-button">Message</button>
                <button className="match-button" onClick={(e) => removeDiv(e.target)}>Ignore</button>
                </div>                            
          </form><br></br>
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
