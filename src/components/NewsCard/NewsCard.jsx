// NewsCard.jsx
import React from "react";
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
  const formattedDate = formatNewsDate(publishedAt);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    onToggleSave();
  };

  return (
    <div className="NewsCard">
      <div className="NewsCard__image-wrapper">
        <img
          src={urlToImage || "https://via.placeholder.com/300x200"}
          alt={title}
          className="NewsCard__image"
        />
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
        <h3 className="NewsCard__title">{title}</h3>
        <p className="NewsCard__description">
          {description || "No description available"}
        </p>
        <div className="NewsCard__meta">
          <span className="NewsCard__date">{formattedDate}</span>
          <span className="NewsCard__source">{source?.name || "Unknown"}</span>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
