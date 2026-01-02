// News API constants
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Use proxy URL in production, direct API in development
export const NEWS_API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";
