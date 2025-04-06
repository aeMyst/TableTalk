import React, { useEffect } from "react";
import Hammer from "hammerjs";
import "../pages/Queue.css";
import "../elements/tinderCard.css";

export default function TinderCards() {
  useEffect(() => {
    const tinderContainer = document.querySelector(".tinder");
    const allCards = document.querySelectorAll(".tinder--card");
    const nope = document.getElementById("nope");
    const love = document.getElementById("love");

    function initCards() {
      const newCards = document.querySelectorAll(".tinder--card:not(.removed)");
      newCards.forEach((card, index) => {
        card.style.zIndex = newCards.length - index;
        card.style.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
        card.style.opacity = (10 - index) / 10;
      });
      tinderContainer.classList.add("loaded");
    }

    initCards();

    allCards.forEach((el) => {
      const hammertime = new Hammer(el);

      hammertime.on("pan", (event) => {
        el.classList.add("moving");

        if (event.deltaX === 0 && event.center.x === 0) return;

        tinderContainer.classList.toggle("tinder_love", event.deltaX > 0);
        tinderContainer.classList.toggle("tinder_nope", event.deltaX < 0);

        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;

        el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
      });

      hammertime.on("panend", (event) => {
        el.classList.remove("moving");
        tinderContainer.classList.remove("tinder_love");
        tinderContainer.classList.remove("tinder_nope");

        const moveOutWidth = document.body.clientWidth;
        const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
        el.classList.toggle("removed", !keep);

        if (keep) {
          el.style.transform = "";
        } else {
          const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
          const toX = event.deltaX > 0 ? endX : -endX;
          const toY = event.deltaY > 0 ? endX : -endX;
          const xMulti = event.deltaX * 0.03;
          const yMulti = event.deltaY / 80;
          const rotate = xMulti * yMulti;

          el.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${rotate}deg)`;
          initCards();
        }
      });
    });

    const createButtonListener = (love) => () => {
      const cards = document.querySelectorAll(".tinder--card:not(.removed)");
      const moveOutWidth = document.body.clientWidth * 1.5;
      if (!cards.length) return;

      const card = cards[0];
      card.classList.add("removed");
      card.style.transform = love
        ? `translate(${moveOutWidth}px, -100px) rotate(-30deg)`
        : `translate(-${moveOutWidth}px, -100px) rotate(30deg)`;

      initCards();
    };

    nope.addEventListener("click", createButtonListener(false));
    love.addEventListener("click", createButtonListener(true));
  }, []);

  const users = [
    {
      img: "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
      username: "Ben Fren",
      classification: "Casual",
      description: "Loves party games and good vibes!",
    },
    {
      img: "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
      username: "Bud Dee",
      classification: "Competitive",
      description: "Always ready for a challenge.",
    },
    {
      img: "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
      username: "Jess Chess",
      classification: "Strategist",
      description: "Lover of logic and tactical battles.",
    },
    {
      img: "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
      username: "James Games",
      classification: "Techie",
      description: "Into digital board game crossovers.",
    },
    {
      img: "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
      username: "Quinten Quaintance",
      classification: "Social",
      description: "I play for the laughs and snacks 🍕",
    }
  ];

  return (
    <div className="tinder">
      <div className="tinder--status">
        <span className="emoji-nope">❌</span>
        <span className="emoji-love">❤️</span>
      </div>

      <div className="tinder--cards">
        {users.map((user, i) => (
          <div className="tinder--card" key={i}>
            <img src={user.img} alt={`Profile of ${user.username}`} />
            <h3>{user.username}</h3>
            <p><strong>{user.classification}</strong></p>
            <p>{user.description}</p>
          </div>
        ))}
      </div>

      <div className="tinder--buttons">
        <button id="nope">❌</button>
        <button id="love">❤️</button>
      </div>
    </div>
  );
}
