// Navigation.jsx

import React from "react";
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
}) {
  return (
    <nav className={`Navigation${isBlack ? " Navigation--black" : ""}`}>
      <div className="Navigation__row">
        <a
          href="/"
          className={`Navigation__link Navigation__link--home Navigation__link--active`}
        >
          Home
          <span className="Navigation__home-underline" />
        </a>
        {!isLoggedIn && (
          <button
            className="Navigation__link Navigation__link--signin"
            type="button"
            onClick={onLogin}
          >
            <span className="Navigation__link--signin-text">Sign in</span>
          </button>
        )}
        {isLoggedIn && (
          <>
            <button
              className="Navigation__link Navigation__link--saved"
              type="button"
              onClick={onSavedArticles}
            >
              Saved articles
              <span className="Navigation__saved-underline" />
            </button>
            <button
              className="Navigation__logout-button"
              type="button"
              onClick={onLogout}
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
  );
}

export default Navigation;
