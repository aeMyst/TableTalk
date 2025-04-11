import React from "react";
import "./Vision.css";

export default function Culture() {
  return (
    <div className="three-column-page">
      <div className="left-description-panel">
        <div className="desc-block">
          <h3>Culture:</h3>
          <p>We value inclusive, open spaces where every voice around the table matters.</p>
        </div>
        <div className="desc-block">
          <h3>Connect:</h3>
          <p>TableTalk helps bridge people together — from old friends to new matches.</p>
        </div>
        <div className="desc-block">
          <h3>Community:</h3>
          <p>Whether online or in-person, we empower groups to grow and play together.</p>
        </div>
      </div>

      <div className="card-section">
        <div className="Vision-card">
          <h1>Culture</h1>
          <img src="https://t3.ftcdn.net/jpg/08/19/18/50/360_F_819185052_onpk6xpz5X0PCIACJKQlj3zHI4uxUYeF.jpg" alt="Culture Icon" className="vision-icon" />
        </div>
        <div className="Vision-card">
          <h1>Connect</h1>
          <img src="https://img.freepik.com/premium-vector/group-six-friends-talks-animatedly-sharing-ideas-cheerful-cartoon-style-setting-people-talking-customizable-cartoon-illustration_538213-146970.jpg" alt="Connect Icon" className="vision-icon-connect" />
        </div>
        <div className="Vision-card">
          <h1>Community</h1>
          <img src="https://img.freepik.com/free-vector/flat-design-international-human-rights-day_23-2148711491.jpg?semt=ais_hybrid&w=740" alt="Community Icon" className="vision-icon" />
        </div>
      </div>
    </div>
  );
}
