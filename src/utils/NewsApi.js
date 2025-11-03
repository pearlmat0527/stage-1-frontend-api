// News API Service

// Your API key from newsapi.org
const API_KEY = "44987000cd604c1cb57209f8314fd023";

// Use production proxy URL when deployed, localhost URL during development
const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2"
    : "https://newsapi.org/v2";

// Helper function to check response
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Get date 7 days ago in YYYY-MM-DD format
const getDateWeekAgo = () => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return weekAgo.toISOString().split("T")[0];
};

// Main function to search for news
export const searchNews = (query) => {
  const fromDate = getDateWeekAgo();
  const toDate = getCurrentDate();

  const url = `${BASE_URL}/everything?q=${encodeURIComponent(
    query
  )}&from=${fromDate}&to=${toDate}&pageSize=100&apiKey=${API_KEY}`;

  return fetch(url)
    .then(checkResponse)
    .then((data) => {
      return data.articles;
    });
};

// Export for use in components
export default {
  searchNews,
};
