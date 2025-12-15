// NewsCardList.jsx
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({ newsCards, isLoggedIn, savedArticles, onToggleSave }) {
  const safeCards = Array.isArray(newsCards) ? newsCards : [];
  const isSaved = (url) =>
    Array.isArray(savedArticles) &&
    savedArticles.some((item) => item.url === url);

  return (
    <section className="NewsCardList">
      {safeCards.map((card, index) => (
        <NewsCard
          key={card.url || index}
          {...card}
          isLoggedIn={isLoggedIn}
          isSaved={isSaved(card.url)}
          onToggleSave={() => onToggleSave && onToggleSave(card)}
        />
      ))}
    </section>
  );
}

export default NewsCardList;
