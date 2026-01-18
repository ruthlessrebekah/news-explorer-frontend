// Navigation.jsx

import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import logoutIconWhite from "../../assets/images/logout-icon-white.svg";
import logoutIconBlack from "../../assets/images/logout-icon-black.svg";
import menuIconBlack from "../../assets/images/menu-icon-black.svg";
import menuIconWhite from "../../assets/images/menu-icon-white.svg";

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
  const menuOverlayRef = useRef(null);
  const previousFocusRef = useRef(null);
  const menuButtonRef = useRef(null);

  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  // Focus trap for mobile menu overlay
  useEffect(() => {
    if (!isMenuOpen) return;

    // Store the previously focused element
    previousFocusRef.current = document.activeElement;

    // Query all focusable elements within the menu overlay
    const getFocusableElements = () => {
      if (!menuOverlayRef.current) return [];
      const focusableSelectors =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      return Array.from(
        menuOverlayRef.current.querySelectorAll(focusableSelectors)
      ).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
      );
    };

    const focusableElements = getFocusableElements();

    // Focus first focusable element (close button)
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Handle focus trap on Tab key
    const handleTabKey = (e) => {
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      // Shift + Tab on first element -> cycle to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab on last element -> cycle to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        handleTabKey(e);
      } else if (e.key === "Escape") {
        handleMenuClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Store the current menu button ref for cleanup
    const menuButtonNode = menuButtonRef.current;

    // Cleanup: restore focus to menu button
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (menuButtonNode?.isConnected) {
        menuButtonNode.focus();
      }
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`Navigation${isBlack ? " Navigation--black" : ""}`}>
        {showMenuIcon && (
          <button
            ref={menuButtonRef}
            className={`Navigation__menu-icon${
              isBlack ? " Navigation__menu-icon--black" : ""
            }`}
            aria-label="Open menu"
            onClick={handleMenuOpen}
          >
            <img
              src={isBlack ? menuIconBlack : menuIconWhite}
              alt="Open menu"
              width="24"
              height="24"
            />
          </button>
        )}
        <div className="Navigation__row">
          <Link
            to="/"
            className={`Navigation__link Navigation__link--home Navigation__link--active`}
            onClick={handleMenuClose}
          >
            Home
            <span className="Navigation__home-underline" />
          </Link>
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
        <div
          ref={menuOverlayRef}
          className="Navigation__menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
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
                    <span className="Navigation__menu-username">
                      {username}
                    </span>
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
                  <Link
                    to="/"
                    className="Navigation__menu-link"
                    onClick={handleMenuClose}
                  >
                    Home
                  </Link>
                  <button
                    className="Navigation__menu-link Navigation__menu-link--logout"
                    onClick={() => {
                      onLogout();
                      handleMenuClose();
                    }}
                  >
                    <span className="Navigation__menu-username">
                      {username}
                    </span>
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
                  <Link
                    to="/"
                    className="Navigation__menu-link"
                    onClick={handleMenuClose}
                  >
                    Home
                  </Link>
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
