// NewsCard.jsx
import React, { useState } from "react";
import "./NewsCard.css";
import { formatNewsDate } from "../../utils/helpers";

function NewsCard({
  title,
  description,
  urlToImage,
  publishedAt,
  source,
  url,
  isLoggedIn,
  isSaved,
  onToggleSave,
}) {
  const [imageError, setImageError] = useState(false);
  const formattedDate = formatNewsDate(publishedAt);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isLoggedIn) return;
    onToggleSave();
  };

  return (
    <a
      className="NewsCard"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={0}
    >
      <div className="NewsCard__image-wrapper">
        {imageError || !urlToImage ? (
          <div
            className="NewsCard__image NewsCard__image--placeholder"
            aria-label="Image unavailable"
          >
            <span className="NewsCard__image-text">Image unavailable</span>
          </div>
        ) : (
          <img
            src={urlToImage}
            alt={title}
            className="NewsCard__image"
            onError={() => setImageError(true)}
          />
        )}
        <button
          className={`NewsCard__save ${
            isLoggedIn ? "NewsCard__save--active" : "NewsCard__save--inactive"
          } ${isSaved ? "NewsCard__save--saved" : ""}`}
          onClick={handleSaveClick}
          aria-label={isSaved ? "Unsave article" : "Save article"}
        ></button>
        {!isLoggedIn && (
          <div className="NewsCard__tooltip">Sign in to save articles</div>
        )}
      </div>
      <div className="NewsCard__content">
        <span className="NewsCard__date">{formattedDate}</span>
        <h3 className="NewsCard__title">{title}</h3>
        <p className="NewsCard__description">
          {description || "No description available"}
        </p>
        <div className="NewsCard__meta">
          <span className="NewsCard__source">{source?.name || "Unknown"}</span>
        </div>
      </div>
    </a>
  );
}

export default NewsCard;
