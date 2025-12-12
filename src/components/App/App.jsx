// App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import About from "../About/About";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { searchNews } from "../../utils/api";
import "./App.css";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = React.useState(false);

  return (
    <AuthProvider>
      <Router>
        <MainRouterContent
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
          isRegisterModalOpen={isRegisterModalOpen}
          setIsRegisterModalOpen={setIsRegisterModalOpen}
        />
      </Router>
    </AuthProvider>
  );
}

function MainRouterContent({
  isLoginModalOpen,
  setIsLoginModalOpen,
  isRegisterModalOpen,
  setIsRegisterModalOpen,
}) {
  const {
    isLoggedIn,
    setIsLoggedIn,
    postLoginRedirect,
    setPostLoginRedirect,
    logout,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // News search state
  const [articles, setArticles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiError, setApiError] = React.useState("");
  const [hasSearched, setHasSearched] = React.useState(false);
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
      return [...prev, article];
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

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        onLogin={openLoginModal}
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
        <Route path="/about" element={<About />} />
        <Route path="/saved-news" element={<ProtectedSavedNews />} />
      </Routes>
      <Footer />
      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onRegister={openRegisterModal}
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            closeLoginModal();
            if (postLoginRedirect) {
              navigate(postLoginRedirect, { replace: true });
              setPostLoginRedirect(null);
            }
          }}
        />
      )}
      {isRegisterModalOpen && (
        <RegisterModal onClose={closeRegisterModal} onLogin={openLoginModal} />
      )}
    </div>
  );
}

export default App;
