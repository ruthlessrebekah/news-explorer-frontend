import React from "react";
import logoutIconWhite from "../../assets/images/logout-icon-white.png";
import logoutIconBlack from "../../assets/images/logout-icon-black.png";
import "./Header.css";

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
        <nav className="Header__nav">
          <a
            href="/"
            className="Header__nav-link Header__nav-link--home Header__nav-link--active"
          >
            Home
            <span className="Header__home-underline" />
          </a>
          {!isLoggedIn && (
            <button
              className="Header__nav-link Header__nav-link--signin"
              type="button"
              onClick={onLogin}
            >
              <span className="Header__nav-link--signin-text">Sign in</span>
            </button>
          )}
          {isLoggedIn && (
            <>
              <button
                className="Header__nav-link Header__nav-link--saved"
                type="button"
                onClick={onSavedArticles}
              >
                Saved articles
                <span className="Header__saved-underline" />
              </button>
              <button
                className="Header__logout-button"
                type="button"
                onClick={onLogout}
              >
                <span className="Header__username">
                  {(username || "").slice(0, 30)}
                </span>
                <img
                  src={isBlack ? logoutIconBlack : logoutIconWhite}
                  alt="Log out"
                  className="Header__logout-icon"
                />
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
