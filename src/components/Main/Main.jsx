// Main.jsx
import React from "react";
import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import About from "../About/About";

function Main({
  articles,
  isLoading,
  apiError,
  hasSearched,
  onSearch,
  isLoggedIn,
  savedArticles,
  onToggleSave,
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchError, setSearchError] = React.useState("");
  const [visibleCount, setVisibleCount] = React.useState(3);
  const [searchSubmitting, setSearchSubmitting] = React.useState(false);

  // DEV helper: force the Preloader to stay visible for styling/debugging
  // Enable by either:
  //  - adding ?preloader=1 to the URL, e.g., http://localhost:5173/?preloader=1
  //  - or setting localStorage.setItem('dev:force-preloader', '1') in the console
  // Disable by removing the query param or calling localStorage.removeItem('dev:force-preloader')
  // This override is ignored in production builds.
  const forcePreloader = (() => {
    try {
      const isProd =
        typeof import.meta !== "undefined" &&
        import.meta.env &&
        import.meta.env.MODE === "production";
      if (isProd) return false;
      const ls = window.localStorage.getItem("dev:force-preloader");
      const sp = new URLSearchParams(window.location.search);
      return (
        ls === "1" ||
        sp.get("preloader") === "1" ||
        window.location.hash.includes("preloader")
      );
    } catch (_e) {
      return false;
    }
  })();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (searchError) setSearchError("");
  };

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);
  const allVisible = visibleCount >= articles.length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!searchQuery.trim()) {
      setSearchError("Please enter a keyword");
      return;
    }

    // Clear previous error and trigger search
    setSearchError("");
    // Flash the active (click) state even for keyboard Enter submits
    setSearchSubmitting(true);
    window.setTimeout(() => setSearchSubmitting(false), 250);
    onSearch(searchQuery);
  };

  return (
    <main className="Main">
      <div className="Main__hero-wrapper">
        <section className="Main__section">
          <div className="Main__hero">
            <div className="Main__hero-content">
              <h1 className="Main__title">What's going on in the world?</h1>
              <p className="Main__subtitle">
                Find the latest news on any topic and save them in your personal
                account.
              </p>
              <div className="Main__search-bar">
                <form className="Main__search" onSubmit={handleSearchSubmit}>
                  <input
                    className="Main__search-input"
                    type="text"
                    placeholder="Enter topic"
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                  <button
                    className={`Main__search-button ${
                      searchQuery.trim()
                        ? `Main__search-button--ready ${
                            searchSubmitting
                              ? "Main__search-button--active"
                              : ""
                          }`
                        : "Main__search-button--idle"
                    }`}
                    type="submit"
                    onMouseDown={() =>
                      searchQuery.trim() && setSearchSubmitting(true)
                    }
                    onMouseUp={() =>
                      searchQuery.trim() &&
                      window.setTimeout(() => setSearchSubmitting(false), 250)
                    }
                  >
                    Search
                  </button>
                </form>
              </div>
              {searchError && (
                <p className="Main__search-error">{searchError}</p>
              )}
            </div>
          </div>
        </section>
      </div>

      {isLoading || forcePreloader ? (
        <section className="Main__section Main__results Main__results--loading">
          <Preloader />
        </section>
      ) : (
        <>
          {hasSearched && articles.length > 0 && (
            <section className="Main__section Main__results">
              <h2 className="Main__section-title">Search results</h2>
              <NewsCardList
                newsCards={articles.slice(0, visibleCount)}
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
                onToggleSave={onToggleSave}
              />
              {!allVisible && (
                <button className="Main__show-more" onClick={handleShowMore}>
                  Show more
                </button>
              )}
            </section>
          )}

          {hasSearched && !apiError && articles.length === 0 && (
            <section className="Main__section Main__no-results">
              <h2 className="Main__section-title">Nothing found</h2>
              <p className="Main__no-results-text">
                Sorry, but nothing matched your search terms.
              </p>
            </section>
          )}

          {hasSearched && apiError && !articles.length && (
            <section className="Main__section Main__no-results">
              <h2 className="Main__section-title">Search results</h2>
              <p className="Main__no-results-text">{apiError}</p>
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default Main;
