// NewsCardList.jsx
import PropTypes from "prop-types";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({ newsCards, isLoggedIn, savedArticles, onToggleSave }) {
  const safeCards = Array.isArray(newsCards) ? newsCards : [];
  const isSaved = (url) =>
    Array.isArray(savedArticles) &&
    savedArticles.some((item) => item.url === url);

  return (
    <ul className="NewsCardList">
      {safeCards.map((card, index) => (
        <li key={card.url || index}>
          <NewsCard
            {...card}
            isLoggedIn={isLoggedIn}
            isSaved={isSaved(card.url)}
            onToggleSave={() => onToggleSave && onToggleSave(card)}
          />
        </li>
      ))}
    </ul>
  );
}

NewsCardList.propTypes = {
  newsCards: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  savedArticles: PropTypes.array.isRequired,
  onToggleSave: PropTypes.func.isRequired,
};

export default NewsCardList;
