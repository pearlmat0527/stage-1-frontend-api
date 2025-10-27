// Simulated API functions for Stage 1
// In Stage 2/3, replace these with real fetch requests to your backend

// Fake saved articles array (simulates database)
let savedArticlesDB = [
  {
    _id: "65f7368dfb74bd6a92114c85",
    keyword: "nature",
    title: "Everyone Needs a Special 'Sit Spot' in Nature",
    text: "Ever since I read Richard Louv's influential book, Last Child in the Woods, the idea of having a special 'sit spot' has stuck with me.",
    date: "2020-11-04T00:00:00.000Z",
    source: "TreeHugger",
    link: "https://www.treehugger.com/everyone-needs-special-sit-spot-in-nature-4868849",
    image:
      "https://www.treehugger.com/thmb/AEF1pEYGPYXpNT_LxFH8fYsOdGs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1200444200-f5b1d3c1e4e44be189d6e8a00f69f2e7.jpg",
    owner: "fake-user-id-123",
  },
];

// Get all saved articles for the current user
export const getItems = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(savedArticlesDB);
    }, 300); // Simulate network delay
  });
};

// Save an article (from News API search results)
export const saveArticle = (article, keyword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Create a new article with _id (like MongoDB would)
      const savedArticle = {
        _id: generateFakeId(),
        keyword: keyword,
        title: article.title,
        text: article.description || article.content,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
        owner: "fake-user-id-123",
      };

      // Add to our fake database
      savedArticlesDB.push(savedArticle);

      resolve(savedArticle);
    }, 500);
  });
};

// Delete a saved article by _id
export const deleteArticle = (articleId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Remove from fake database
      savedArticlesDB = savedArticlesDB.filter(
        (article) => article._id !== articleId
      );

      resolve({ message: "Article deleted successfully" });
    }, 300);
  });
};

// Helper function to generate fake MongoDB-style IDs
function generateFakeId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
