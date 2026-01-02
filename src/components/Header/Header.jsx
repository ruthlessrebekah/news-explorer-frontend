import PropTypes from "prop-types";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ isLoggedIn, onLogin, onLogout, onSavedArticles, isBlack }) {
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
        {/* Mobile menu icon for 320px - now handled in Navigation */}
        <Navigation
          isLoggedIn={isLoggedIn}
          onLogin={onLogin}
          onLogout={onLogout}
          onSavedArticles={onSavedArticles}
          isBlack={isBlack}
          showMenuIcon={true}
        />
      </div>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onSavedArticles: PropTypes.func.isRequired,
  isBlack: PropTypes.bool,
};

export default Header;
