// NewsCard.jsx
import { useState } from "react";
import PropTypes from "prop-types";
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

  // TODO: Future enhancement - trigger login modal when logged-out user clicks disabled button
  // This would provide a more interactive user flow than the current disabled state
  const handleSaveClick = () => {
    if (!isLoggedIn) return;
    onToggleSave();
  };

  return (
    <article className="NewsCard">
      <a
        className="NewsCard__link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read article: ${title}`}
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
        </div>
        <div className="NewsCard__content">
          <span className="NewsCard__date">{formattedDate}</span>
          <h3 className="NewsCard__title">{title}</h3>
          <p className="NewsCard__description">
            {description || "No description available"}
          </p>
          <div className="NewsCard__meta">
            <span className="NewsCard__source">
              {source?.name || "Unknown"}
            </span>
          </div>
        </div>
      </a>
      <button
        className={`NewsCard__save ${
          isLoggedIn ? "NewsCard__save--active" : "NewsCard__save--inactive"
        } ${isSaved ? "NewsCard__save--saved" : ""}`}
        onClick={handleSaveClick}
        disabled={!isLoggedIn}
        aria-label={
          !isLoggedIn
            ? "Sign in required to save articles"
            : isSaved
            ? "Remove saved article"
            : "Save article"
        }
      ></button>
      {!isLoggedIn && (
        <div className="NewsCard__tooltip">Sign in to save articles</div>
      )}
    </article>
  );
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  urlToImage: PropTypes.string,
  publishedAt: PropTypes.string.isRequired,
  source: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  url: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  onToggleSave: PropTypes.func.isRequired,
};

export default NewsCard;
