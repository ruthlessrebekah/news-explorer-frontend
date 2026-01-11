// SavedNews.jsx
import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import "./SavedNews.css";

function SavedNews({ savedArticles = [], onToggleSave }) {
  const [userName, setUserName] = useState("User");
  // Track image load errors by article URL
  const [imageErrors, setImageErrors] = useState(new Set());
  // Reset image errors when savedArticles changes
  useEffect(() => {
    setImageErrors(new Set());
  }, [savedArticles]);

  // Handler for image load errors
  const handleImageError = (articleUrl) => {
    setImageErrors((prev) => new Set([...prev, articleUrl]));
  };

  // Defensive utility for safe text rendering
  const safeText = (value, fallback = "—") =>
    typeof value === "string" && value.trim() ? value : fallback;

  // Defensive utility for safe date formatting
  const safeDate = (value, fallback = "Date unavailable") => {
    if (!value || typeof value !== "string" || !value.trim()) return fallback;
    const date = new Date(value);
    if (isNaN(date.getTime())) return fallback;
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get user name from localStorage
  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.name || "User");
      }
    } catch (e) {
      console.error("Failed to parse user data:", e);
    }
  }, []);

  // Memoize keywords extraction for performance
  const keywords = useMemo(() => {
    const keywordsSet = new Set();
    savedArticles.forEach((article) => {
      const keywordText = safeText(article.keyword);
      if (keywordText !== "—") {
        keywordsSet.add(keywordText);
      }
    });
    return Array.from(keywordsSet);
  }, [savedArticles]);

  const hasArticles = savedArticles.length > 0;

  return (
    <section className="SavedNews">
      <div className="SavedNews__container">
        {/* Header */}
        <div className="SavedNews__header">
          <div className="SavedNews__header-content">
            <p className="SavedNews__label">Saved articles</p>
            <h1 className="SavedNews__title">
              {userName}, you have {savedArticles.length} saved{" "}
              {savedArticles.length === 1 ? "article" : "articles"}
            </h1>

            {hasArticles && keywords.length > 0 && (
              <p className="SavedNews__keywords">
                By keywords:{" "}
                {keywords.length <= 3
                  ? keywords.map((keyword, index) => (
                      <span className="SavedNews__keyword" key={keyword}>
                        {keyword}
                        {index < keywords.length - 1 && ", "}
                      </span>
                    ))
                  : [
                      ...keywords.slice(0, 3).map((keyword, index) => (
                        <span className="SavedNews__keyword" key={keyword}>
                          {keyword}
                          {index < 2 && ", "}
                        </span>
                      )),
                      <span className="SavedNews__keyword" key="other">
                        {keywords.length > 3 &&
                          `, and ${keywords.length - 3} other`}
                      </span>,
                    ]}
              </p>
            )}
          </div>
        </div>

        {/* Articles Grid with full-width background */}
        {hasArticles ? (
          <div className="SavedNews__cards-bg">
            <div className="SavedNews__cards">
              {savedArticles.map((article) => {
                const keywordText = safeText(article.keyword);
                return (
                  <a
                    key={article.url}
                    className="SavedNews__card"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={0}
                  >
                    {/* Image Container */}
                    <div className="SavedNews__image-wrapper">
                      {imageErrors.has(article.url) ||
                      !(article.urlToImage || article.imageUrl) ? (
                        <div
                          className="SavedNews__image SavedNews__image--placeholder"
                          aria-label="Image unavailable"
                        >
                          <span className="SavedNews__image-text">
                            Image unavailable
                          </span>
                        </div>
                      ) : (
                        <img
                          src={article.urlToImage || article.imageUrl}
                          alt={article.title}
                          className="SavedNews__image"
                          onError={() => handleImageError(article.url)}
                        />
                      )}
                      <div className="SavedNews__actions">
                        {/* Delete Button */}
                        <button
                          className="SavedNews__delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onToggleSave(article);
                          }}
                          aria-label="Delete article"
                        />
                        {/* Remove from Saved Label */}
                        <span className="SavedNews__remove-label">
                          Remove from saved
                        </span>
                        {/* Keyword Tag */}
                        {keywordText !== "—" && (
                          <span className="SavedNews__tag">{keywordText}</span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="SavedNews__content">
                      <span className="SavedNews__date">
                        {safeDate(article.publishedAt)}
                      </span>
                      <h3 className="SavedNews__card-title">
                        {safeText(article.title, "Untitled")}
                      </h3>
                      <p className="SavedNews__card-description">
                        {safeText(
                          article.description,
                          "No description available"
                        )}
                      </p>
                      <div className="SavedNews__meta">
                        <span className="SavedNews__source">
                          {article.source?.name || article.source || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="SavedNews__cards-bg">
            <div className="SavedNews__empty-state">
              {/* Optional: Add an SVG or image here */}
              <p className="SavedNews__empty-title">
                You haven’t saved any articles yet.
              </p>
              <p className="SavedNews__empty-text">
                Start exploring and save articles to see them here.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

SavedNews.propTypes = {
  savedArticles: PropTypes.arrayOf(PropTypes.object),
  onToggleSave: PropTypes.func.isRequired,
};

export default SavedNews;
