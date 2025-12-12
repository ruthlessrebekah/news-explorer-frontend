// Preloader.jsx
import React from "react";
import "./Preloader.css";

function Preloader() {
  return (
    <div className="Preloader">
      <div className="circle-preloader"></div>
      <p className="Preloader__text">Searching for news...</p>
    </div>
  );
}

export default Preloader;
