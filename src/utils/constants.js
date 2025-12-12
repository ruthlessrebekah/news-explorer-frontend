// News API constants
export const NEWS_API_KEY = "1ef40212d6a64bb8a7501f393992f973";

// Use proxy URL in production, direct API in development
export const NEWS_API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";
