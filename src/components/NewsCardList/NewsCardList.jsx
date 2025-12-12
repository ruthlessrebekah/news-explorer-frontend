// NewsCardList.jsx
import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({ newsCards, isLoggedIn, savedArticles, onToggleSave }) {
  const isSaved = (url) => savedArticles?.some((item) => item.url === url);

  return (
    <section className="NewsCardList">
      {newsCards.map((card, index) => (
        <NewsCard
          key={card.url || index}
          {...card}
          isLoggedIn={isLoggedIn}
          isSaved={isSaved(card.url)}
          onToggleSave={() => onToggleSave(card)}
        />
      ))}
    </section>
  );
}

export default NewsCardList;
