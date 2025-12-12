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
      if (article.title) {
        // Extract key words from title (simple approach: take significant words)
        const words = article.title.split(" ").filter((w) => w.length > 3);
        words.slice(0, 2).forEach((word) => keywords.add(word));
      }
    });
    return Array.from(keywords).slice(0, 3);
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
              {keywords.map((keyword, index) => (
                <span key={index}>
                  {keyword}
                  {index < keywords.length - 1 && ", "}
                  {index === keywords.length - 2 && savedArticles.length > 5
                    ? " and 2 other"
                    : ""}
                </span>
              ))}
            </p>
          )}
        </div>

        {/* Articles Grid */}
        {hasArticles ? (
          <div className="SavedNews__cards">
            {savedArticles.map((article) => (
              <div key={article.url} className="SavedNews__card">
                {/* Image Container */}
                <div className="SavedNews__image-wrapper">
                  <img
                    src={article.urlToImage || article.imageUrl}
                    alt={article.title}
                    className="SavedNews__image"
                  />
                  {/* Keyword Tag */}
                  {article.keyword && (
                    <span className="SavedNews__tag">{article.keyword}</span>
                  )}
                  {/* Delete Button */}
                  <button
                    className="SavedNews__delete"
                    onClick={() => onToggleSave(article)}
                    title="Delete article"
                  >
                    <span className="visually-hidden">Delete article</span>
                  </button>
                  {/* Remove from Saved Label */}
                  <span className="SavedNews__remove-label">
                    Remove from saved
                  </span>
                </div>

                {/* Content */}
                <div className="SavedNews__content">
                  <h3 className="SavedNews__card-title">{article.title}</h3>
                  <p className="SavedNews__card-description">
                    {article.description}
                  </p>
                  <div className="SavedNews__card-footer">
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
                    <span className="SavedNews__source">
                      {article.source?.name || article.source}
                    </span>
                  </div>
                </div>
              </div>
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
