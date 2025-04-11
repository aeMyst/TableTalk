import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="info-page">
      <div className="about-row">
        <div className="image-side">
          <img
            src="https://dailyworkerplacement.com/wp-content/uploads/2017/12/shelfb-1648x1140.jpg"
            alt="People playing board games"
            className="about-img"
          />
        </div>
        <div className="text-side">
          <h1>About Us</h1>
          <p>
            TableTalk was built for board game lovers looking to connect with like-minded players.
            Whether you're just starting out or are a veteran of strategic showdowns, our platform
            helps you find players, discover games, and dive into thoughtful discussions around
            gameplay and strategy.
          </p>
          <p>
            At TableTalk, we believe the magic of board games lies in the shared laughter, intense
            rivalries, and memorable moments around the table. We’re passionate about bringing that
            experience online — not to replace it, but to make the real-life moments even easier to
            create.
          </p>
          <p>
            Whether you're into deep strategy games like *Twilight Imperium*, party favorites like
            *Codenames*, or light family games like *Ticket to Ride*, you’ll find a home here.
            Join a community where board games aren’t just a hobby, they’re a way of connecting.
          </p>
        </div>
      </div>
    </div>
  );
}
