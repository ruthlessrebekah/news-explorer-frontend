// Main.jsx
import React from "react";
import PropTypes from "prop-types";
import "./Main.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

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
  const [visibleCount, setVisibleCount] = React.useState(3);

  React.useEffect(() => {
    setVisibleCount(3);
  }, [articles]);

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);
  const allVisible = visibleCount >= articles.length;

  return (
    <main className="Main">
      <div className="Main__hero-wrapper">
        <section className="Main__section">
          <div className="Main__hero">
            <div className="Main__hero-content">
              <h1 className="Main__title">
                What&apos;s going on in the world?
              </h1>
              <p className="Main__subtitle">
                Find the latest news on any topic and save them in your personal
                account.
              </p>
              <SearchForm onSearch={onSearch} />
            </div>
          </div>
        </section>
      </div>

      {isLoading ? (
        <section className="Main__section Main__results Main__results--loading">
          <Preloader />
        </section>
      ) : (
        <>
          {hasSearched && articles.length > 0 && (
            <section className="Main__section Main__results">
              <div className="Main__results-content">
                <h2 className="Main__section-title">Search results</h2>
                <NewsCardList
                  newsCards={articles.slice(0, visibleCount)}
                  isLoggedIn={isLoggedIn}
                  savedArticles={savedArticles}
                  onToggleSave={onToggleSave}
                />
                {!allVisible && (
                  <button
                    className="Main__show-more"
                    onClick={handleShowMore}
                    onMouseUp={(e) => e.currentTarget.blur()}
                  >
                    Show more
                  </button>
                )}
              </div>
            </section>
          )}

          {hasSearched && !apiError && articles.length === 0 && (
            <section className="Main__section Main__no-results">
              <div className="Main__no-results-icon" />
              <h2 className="Main__status-title">Nothing found</h2>
              <p className="Main__no-results-text">
                Sorry, but nothing matched
                <br />
                your search terms.
              </p>
            </section>
          )}

          {hasSearched && apiError && (
            <section className="Main__section Main__no-results">
              <h2 className="Main__status-title">Search results</h2>
              <p className="Main__no-results-text">{apiError}</p>
            </section>
          )}
        </>
      )}
    </main>
  );
}

Main.propTypes = {
  articles: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  apiError: PropTypes.string,
  hasSearched: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  savedArticles: PropTypes.array.isRequired,
  onToggleSave: PropTypes.func.isRequired,
};

export default Main;
