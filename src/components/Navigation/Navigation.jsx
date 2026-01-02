// Navigation.jsx

import { useState } from "react";
import PropTypes from "prop-types";
import "./Navigation.css";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import logoutIconWhite from "../../assets/images/logout-icon-white.png";
import logoutIconBlack from "../../assets/images/logout-icon-black.png";
import menuIconBlack from "../../assets/images/menu-icon-black.png";
import menuIconWhite from "../../assets/images/menu-icon-white.png";

function Navigation({
  isLoggedIn,
  onLogin,
  onLogout,
  onSavedArticles,
  isBlack,
  showMenuIcon,
}) {
  const { currentUser } = useCurrentUser();
  const username = currentUser?.name || "User";

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  return (
    <>
      <nav className={`Navigation${isBlack ? " Navigation--black" : ""}`}>
        {showMenuIcon && (
          <button
            className={`Navigation__menu-icon${
              isBlack ? " Navigation__menu-icon--black" : ""
            }`}
            aria-label="Open menu"
            onClick={handleMenuOpen}
          >
            <img
              src={isBlack ? menuIconBlack : menuIconWhite}
              alt=""
              width="24"
              height="24"
            />
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
              {/* Main home page when logged in: Saved news + Username/logout */}
              {isLoggedIn && !isBlack && (
                <>
                  <button
                    className="Navigation__menu-link"
                    onClick={() => {
                      onSavedArticles();
                      handleMenuClose();
                    }}
                  >
                    Saved articles
                  </button>
                  <button
                    className="Navigation__menu-link Navigation__menu-link--logout"
                    onClick={() => {
                      onLogout();
                      handleMenuClose();
                    }}
                  >
                    {username}
                    <img
                      src={logoutIconWhite}
                      alt="Logout"
                      className="Navigation__menu-logout-icon"
                    />
                  </button>
                </>
              )}

              {/* Saved news page when logged in: Home + Username/logout */}
              {isLoggedIn && isBlack && (
                <>
                  <a
                    href="/"
                    className="Navigation__menu-link"
                    onClick={handleMenuClose}
                  >
                    Home
                  </a>
                  <button
                    className="Navigation__menu-link Navigation__menu-link--logout"
                    onClick={() => {
                      onLogout();
                      handleMenuClose();
                    }}
                  >
                    {username}
                    <img
                      src={logoutIconWhite}
                      alt="Logout"
                      className="Navigation__menu-logout-icon"
                    />
                  </button>
                </>
              )}

              {/* Not logged in: Home + Sign in */}
              {!isLoggedIn && (
                <>
                  <a
                    href="/"
                    className="Navigation__menu-link"
                    onClick={handleMenuClose}
                  >
                    Home
                  </a>
                  <button
                    className="Navigation__menu-link"
                    onClick={() => {
                      onLogin();
                      handleMenuClose();
                    }}
                  >
                    Sign in
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onSavedArticles: PropTypes.func.isRequired,
  isBlack: PropTypes.bool,
  showMenuIcon: PropTypes.bool,
};

export default Navigation;
