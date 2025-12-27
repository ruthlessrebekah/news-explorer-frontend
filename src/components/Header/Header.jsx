import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

export default function Header({
  isLoggedIn,
  username,
  onLogin,
  onLogout,
  onSavedArticles,
  isBlack,
}) {
  return (
    <header
      className={[
        "Header",
        isLoggedIn && "Header--logged-in",
        isBlack && "Header--black",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="Header__container">
        <a href="/" className="Header__logo" aria-label="Go to main page">
          NewsExplorer
        </a>
        <Navigation
          isLoggedIn={isLoggedIn}
          username={username}
          onLogin={onLogin}
          onLogout={onLogout}
          onSavedArticles={onSavedArticles}
          isBlack={isBlack}
        />
      </div>
    </header>
  );
}
