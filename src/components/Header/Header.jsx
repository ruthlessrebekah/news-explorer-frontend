// Header.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ isLoggedIn, onLogout, onLogin }) {
  const location = useLocation();
  const showHomeUnderline = location.pathname === "/";
  const isSavedNews = location.pathname === "/saved-news";
  const headerClassName = `Header ${
    isLoggedIn && isSavedNews ? "Header--black" : ""
  }`;
  return (
    <header className={headerClassName}>
      <div className="Header__logo">
        <Link to="/" className="Header__logo-link">
          News Explorer
        </Link>
      </div>
      <nav className="Header__nav">
        <div className="Header__nav-home-wrapper">
          <Link to="/" className="Header__nav-link">
            Home
          </Link>
          {showHomeUnderline && <div className="Header__nav-underline" />}
        </div>
        {isLoggedIn && (
          <Link to="/saved-news" className="Header__nav-link">
            Saved News
          </Link>
        )}
        {isLoggedIn ? (
          <button className="Header__nav-link" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <button
            className="Header__nav-link Header__nav-signin"
            onClick={onLogin}
          >
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
