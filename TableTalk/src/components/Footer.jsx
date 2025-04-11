import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="corner-footer">
      © {new Date().getFullYear()} TableTalk. All rights reserved.
      <div className="corner-footer-second">
        Made with 🎲 for board game lovers.
      </div>
    </div>
  );
}