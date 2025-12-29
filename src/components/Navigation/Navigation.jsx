// Navigation.jsx

import React, { useState } from "react";
import "./Navigation.css";
import logoutIconWhite from "../../assets/images/logout-icon-white.png";
import logoutIconBlack from "../../assets/images/logout-icon-black.png";

function Navigation({
  isLoggedIn,
  username,
  onLogin,
  onLogout,
  onSavedArticles,
  isBlack,
  showMenuIcon,
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  return (
    <>
      <nav className={`Navigation${isBlack ? " Navigation--black" : ""}`}>
        {showMenuIcon && (
          <button
            className="Header__menu-icon"
            aria-label="Open menu"
            onClick={handleMenuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="4" width="24" height="2" rx="1" fill="#1A1B22" />
              <rect y="11" width="24" height="2" rx="1" fill="#1A1B22" />
              <rect y="18" width="24" height="2" rx="1" fill="#1A1B22" />
            </svg>
          </button>
        )}
        <div className="Navigation__row">
          <a
            href="/"
            className={`Navigation__link Navigation__link--home Navigation__link--active`}
            onClick={handleMenuClose}
          >
            Home
            <span className="Navigation__home-underline" />
          </a>
          {!isLoggedIn && (
            <button
              className="Navigation__link Navigation__link--signin"
              type="button"
              onClick={() => {
                onLogin();
                handleMenuClose();
              }}
            >
              <span className="Navigation__link--signin-text">Sign in</span>
            </button>
          )}
          {isLoggedIn && (
            <>
              <button
                className="Navigation__link Navigation__link--saved"
                type="button"
                onClick={() => {
                  onSavedArticles();
                  handleMenuClose();
                }}
              >
                Saved articles
                <span className="Navigation__saved-underline" />
              </button>
              <button
                className="Navigation__logout-button"
                type="button"
                onClick={() => {
                  onLogout();
                  handleMenuClose();
                }}
              >
                <span className="Navigation__username">{username}</span>
                <img
                  src={isBlack ? logoutIconBlack : logoutIconWhite}
                  alt="Logout"
                  className="Navigation__logout-icon"
                />
              </button>
            </>
          )}
        </div>
      </nav>
      {/* Overlay menu for mobile */}
      {isMenuOpen && (
        <div className="Navigation__menu-overlay">
          <div className="Navigation__menu-content">
            <div className="Navigation__menu-top">
              <span className="Navigation__menu-logo">NewsExplorer</span>
              <button
                className="Navigation__menu-close"
                aria-label="Close menu"
                onClick={handleMenuClose}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <nav className="Navigation__menu-nav">
              <a
                href="/"
                className="Navigation__menu-link"
                onClick={handleMenuClose}
              >
                Home
              </a>
              {isLoggedIn && (
                <button
                  className="Navigation__menu-link"
                  onClick={() => {
                    onLogout();
                    handleMenuClose();
                  }}
                >
                  {username} / Sign out
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;
