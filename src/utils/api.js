// api.js
import { NEWS_API_KEY, NEWS_API_BASE_URL } from "./constants";

/**
 * Fetches news articles from News API based on search query
 * @param {string} query - The search keyword
 * @returns {Promise} Promise with news articles data
 */
export const searchNews = async (query) => {
  // Calculate dates: from 7 days ago to today
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  // Format dates as YYYY-MM-DD
  const toDate = today.toISOString().split("T")[0];
  const fromDate = weekAgo.toISOString().split("T")[0];

  // Build URL with query parameters
  const url = new URL(NEWS_API_BASE_URL);
  url.searchParams.append("q", query);
  url.searchParams.append("apiKey", NEWS_API_KEY);
  url.searchParams.append("from", fromDate);
  url.searchParams.append("to", toDate);
  url.searchParams.append("pageSize", "100");

  console.log("Fetching news from:", url.toString());

  try {
    const response = await fetch(url);

    console.log("API Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error details:", errorData);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response data:", data);

    if (data.status === "error") {
      throw new Error(data.message || "Error fetching news");
    }

    // Return empty array if no articles found
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

/**
 * Returns a list of saved articles (stub)
 * In Stage 2/3, this will make a real fetch request to the backend
 * @returns {Promise} Promise resolving to array of saved articles
 */
export function getSavedArticles() {
  return new Promise((resolve) => {
    resolve([]);
  });
}

/**
 * Saves an article (stub)
 * In Stage 2/3, this will make a real fetch request to the backend
 * @param {object} article - The article to save
 * @returns {Promise} Promise resolving to the saved article with _id
 */
export function saveArticle(article) {
  return new Promise((resolve) => {
    // Generate a fake MongoDB ID
    const fakeId =
      "65f7368dfb74bd6a92114c" + Math.random().toString(36).substr(2, 3);

    resolve({
      _id: fakeId,
      url: article.url,
      title: article.title,
      description: article.description,
      imageUrl: article.urlToImage,
      source: article.source?.name || article.source,
      publishedAt: article.publishedAt,
    });
  });
}

/**
 * Deletes a saved article (stub)
 * In Stage 2/3, this will make a real fetch request to the backend
 * @param {string} articleUrl - The URL of the article to delete
 * @returns {Promise} Promise resolving when deletion is complete
 */
export function deleteSavedArticle() {
  return new Promise((resolve) => {
    resolve({ message: "Article deleted" });
  });
}
