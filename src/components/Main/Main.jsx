import { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import "./Main.css";
import notFoundIcon from "../../images/not-found_v1.svg";

function Main({
  articles,
  isLoading,
  searchError,
  hasSearched,
  isLoggedIn,
  onSaveArticle,
  onDeleteArticle,
  savedArticles,
}) {
  const [visibleCards, setVisibleCards] = useState(3);

  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 3);
  };

  // Check if an article is saved
  const isArticleSaved = (article) => {
    return savedArticles.some(
      (saved) => saved.title === article.title && saved.url === article.url
    );
  };

  // Get saved article ID
  const getSavedArticleId = (article) => {
    const saved = savedArticles.find(
      (saved) => saved.title === article.title && saved.url === article.url
    );
    return saved?._id;
  };

  // Show preloader while loading
  if (isLoading) {
    return (
      <main className="main">
        <Preloader />
        <About />
      </main>
    );
  }

  // Show error if there's an error
  if (searchError) {
    return (
      <main className="main">
        <section className="news-cards">
          <div className="news-cards__error">
            <p className="news-cards__error-text">{searchError}</p>
          </div>
        </section>
        <About />
      </main>
    );
  }

  // Show "Nothing found" if search was made but no articles found
  if (hasSearched && articles.length === 0 && !isLoading) {
    return (
      <main className="main">
        <section className="news-cards">
          <img
            src={notFoundIcon}
            alt="Nothing found"
            className="news-cards__not-found-icon"
          />
          <div className="news-cards__not-found">
            <h2 className="news-cards__not-found-title">Nothing found</h2>
            <p className="news-cards__not-found-text">
              Sorry, but nothing matched your search terms.
            </p>
          </div>
        </section>
        <About />
      </main>
    );
  }

  // Show articles if they exist
  if (articles.length > 0) {
    const displayedArticles = articles.slice(0, visibleCards);
    const hasMore = visibleCards < articles.length;

    return (
      <main className="main">
        <section className="news-cards">
          <h2 className="news-cards__title">Search results</h2>
          <div className="news-cards__grid">
            {displayedArticles.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                isLoggedIn={isLoggedIn}
                onSave={onSaveArticle}
                onDelete={onDeleteArticle}
                isSaved={isArticleSaved(article)}
                savedArticleId={getSavedArticleId(article)}
              />
            ))}
          </div>
          {hasMore && (
            <button className="news-cards__button" onClick={handleShowMore}>
              Show more
            </button>
          )}
        </section>
        <About />
      </main>
    );
  }

  // Default: show About section only (before any search)
  return (
    <main className="main">
      <About />
    </main>
  );
}

export default Main;
