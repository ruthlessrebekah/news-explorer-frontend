// App.jsx

import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext.jsx";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext.jsx";
import { useAuth } from "../../hooks/useAuth";
import { useCurrentUser } from "../../hooks/useCurrentUser";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import About from "../About/About";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { searchNews } from "../../utils/api";
import "./App.css";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  return (
    <AuthProvider>
      <CurrentUserProvider>
        <Router>
          <MainRouterContent
            isLoginModalOpen={isLoginModalOpen}
            setIsLoginModalOpen={setIsLoginModalOpen}
            isRegisterModalOpen={isRegisterModalOpen}
            setIsRegisterModalOpen={setIsRegisterModalOpen}
            isSuccessModalOpen={isSuccessModalOpen}
            setIsSuccessModalOpen={setIsSuccessModalOpen}
          />
        </Router>
      </CurrentUserProvider>
    </AuthProvider>
  );
}

function MainRouterContent({
  isLoginModalOpen,
  setIsLoginModalOpen,
  isRegisterModalOpen,
  setIsRegisterModalOpen,
  isSuccessModalOpen,
  setIsSuccessModalOpen,
}) {
  const {
    isLoggedIn,
    setIsLoggedIn,
    postLoginRedirect,
    setPostLoginRedirect,
    logout: authLogout,
  } = useAuth();
  const { setCurrentUser } = useCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    authLogout();
    setCurrentUser(null);
  };

  // News search state
  const [articles, setArticles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState("");
  const [hasSearched, setHasSearched] = React.useState(false);
  const [currentKeyword, setCurrentKeyword] = React.useState(""); // track search keyword
  const [savedArticles, setSavedArticles] = React.useState([]); // store by url

  // Search handler
  const handleSearch = async (query) => {
    const trimmed = query.trim();

    if (!trimmed) {
      setApiError("Please enter a keyword");
      setArticles([]);
      setHasSearched(false);
      return;
    }

    setApiError("");
    setIsLoading(true);
    setHasSearched(true);
    setCurrentKeyword(trimmed); // store the search keyword

    try {
      const results = await searchNews(trimmed);
      setArticles(results);
    } catch (error) {
      console.error("Search failed:", error);
      setApiError(
        "Sorry, something went wrong during the request. Please try again later."
      );
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSave = (article) => {
    if (!article?.url) return;
    setSavedArticles((prev) => {
      const exists = prev.find((item) => item.url === article.url);
      if (exists) {
        return prev.filter((item) => item.url !== article.url);
      }
      // Attach the search keyword to the saved article
      return [...prev, { ...article, keyword: currentKeyword }];
    });
  };

  // Custom element for protected route: redirects to home with login required message and remembers intended route
  const ProtectedSavedNews = () => {
    if (isLoggedIn)
      return (
        <SavedNews
          savedArticles={savedArticles}
          onToggleSave={handleToggleSave}
        />
      );
    // Only set redirect if not already set
    if (!postLoginRedirect) setPostLoginRedirect("/saved-news");
    return (
      <Navigate
        to="/"
        replace
        state={{ loginRequired: true, from: "/saved-news" }}
      />
    );
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setPostLoginRedirect(null);
  };
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  const handleSavedArticles = () => navigate("/saved-news");

  return (
    <div
      className={`App${
        isLoginModalOpen || isRegisterModalOpen ? " App--modal-open" : ""
      }`}
    >
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        onLogin={openLoginModal}
        onSavedArticles={handleSavedArticles}
        isBlack={location.pathname === "/saved-news"}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              showLoginRequiredMessage={
                location.state && location.state.loginRequired
              }
              onLogin={openLoginModal}
              onSearch={handleSearch}
              articles={articles}
              isLoading={isLoading}
              apiError={apiError}
              hasSearched={hasSearched}
              isLoggedIn={isLoggedIn}
              savedArticles={savedArticles}
              onToggleSave={handleToggleSave}
            />
          }
        />
        <Route path="/saved-news" element={<ProtectedSavedNews />} />
      </Routes>
      {location.pathname !== "/saved-news" && (
        <section className="Main__about-section">
          <About />
        </section>
      )}
      <Footer />
      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onRegister={openRegisterModal}
          onLoginSuccess={(userData) => {
            setIsLoggedIn(true);
            setCurrentUser(userData);
            closeLoginModal();
            if (postLoginRedirect) {
              navigate(postLoginRedirect, { replace: true });
              setPostLoginRedirect(null);
            }
          }}
        />
      )}
      {isRegisterModalOpen && (
        <RegisterModal
          onClose={closeRegisterModal}
          onLogin={openLoginModal}
          onRegisterSuccess={() => {
            closeRegisterModal();
            openSuccessModal();
          }}
        />
      )}
      {isSuccessModalOpen && (
        <SuccessModal
          onClose={closeSuccessModal}
          onSignIn={() => {
            closeSuccessModal();
            openLoginModal();
          }}
        />
      )}
    </div>
  );
}

MainRouterContent.propTypes = {
  isLoginModalOpen: PropTypes.bool.isRequired,
  setIsLoginModalOpen: PropTypes.func.isRequired,
  isRegisterModalOpen: PropTypes.bool.isRequired,
  setIsRegisterModalOpen: PropTypes.func.isRequired,
  isSuccessModalOpen: PropTypes.bool.isRequired,
  setIsSuccessModalOpen: PropTypes.func.isRequired,
};

export default App;
