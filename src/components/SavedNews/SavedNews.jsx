// SavedNews.jsx
import React, { useState, useEffect } from "react";
import "./SavedNews.css";

function SavedNews({ savedArticles = [], onToggleSave }) {
  const [userName, setUserName] = useState("User");

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

  // Extract unique keywords from saved articles
  const getKeywords = () => {
    const keywords = new Set();
    savedArticles.forEach((article) => {
      if (article.keyword) {
        keywords.add(article.keyword);
      }
    });
    return Array.from(keywords);
  };

  const keywords = getKeywords();
  const hasArticles = savedArticles.length > 0;

  return (
    <section className="SavedNews">
      <div className="SavedNews__container">
        {/* Header */}
        <div className="SavedNews__header">
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
                    <span className="SavedNews__keyword" key={index}>
                      {keyword}
                      {index < keywords.length - 1 && ", "}
                    </span>
                  ))
                : [
                    ...keywords.slice(0, 3).map((keyword, index) => (
                      <span className="SavedNews__keyword" key={index}>
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

        {/* Articles Grid */}
        {hasArticles ? (
          <div className="SavedNews__cards">
            {savedArticles.map((article) => (
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
                  {!(article.urlToImage || article.imageUrl) ? (
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
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.parentNode.querySelector(
                          ".SavedNews__image--placeholder"
                        ).style.display = "flex";
                      }}
                    />
                  )}
                  {/* Keyword Tag */}
                  {article.keyword && (
                    <span className="SavedNews__tag">{article.keyword}</span>
                  )}
                  {/* Delete Button */}
                  <button
                    className="SavedNews__delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onToggleSave(article);
                    }}
                    title="Delete article"
                  >
                    <span className="visually-hidden">Delete article</span>
                  </button>
                  {/* Remove from Saved Label */}
                  <span className="SavedNews__remove-label">
                    Remove from saved
                  </span>
                  {/* Hidden placeholder for broken image fallback */}
                  <div
                    className="SavedNews__image SavedNews__image--placeholder"
                    style={{ display: "none" }}
                    aria-label="Image unavailable"
                  >
                    <span className="SavedNews__image-text">
                      Image unavailable
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="SavedNews__content">
                  <span className="SavedNews__date">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : ""}
                  </span>
                  <h3 className="SavedNews__card-title">{article.title}</h3>
                  <p className="SavedNews__card-description">
                    {article.description || "No description available"}
                  </p>
                  <div className="SavedNews__meta">
                    <span className="SavedNews__source">
                      {article.source?.name || article.source || "Unknown"}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="SavedNews__empty">
            <p>You haven't saved any articles yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SavedNews;
