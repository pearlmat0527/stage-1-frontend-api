import NewsCard from "../NewsCard/NewsCard";
import "./SavedNews.css";

function SavedNews({
  isLoggedIn,
  currentUser,
  savedArticles,
  onDeleteArticle,
}) {
  // Get unique keywords from saved articles
  const keywords = [
    ...new Set(savedArticles.map((article) => article.keyword)),
  ];
  const keywordText = keywords.slice(0, 2).join(", ");

  if (!isLoggedIn) {
    return (
      <main className="saved-news">
        <section className="saved-news__header">
          <p className="saved-news__subtitle">Saved articles</p>
          <h1 className="saved-news__title">
            Please sign in to view your saved articles.
          </h1>
        </section>
      </main>
    );
  }

  if (savedArticles.length === 0) {
    return (
      <main className="saved-news">
        <section className="saved-news__header">
          <p className="saved-news__subtitle">Saved articles</p>
          <h1 className="saved-news__title">You have no saved articles yet</h1>
        </section>
      </main>
    );
  }

  const userName =
    currentUser?.name || currentUser?.email?.split("@")[0] || "User";

  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <p className="saved-news__subtitle">Saved articles</p>
        <h1 className="saved-news__title">
          {userName}, you have {savedArticles.length} saved{" "}
          {savedArticles.length === 1 ? "article" : "articles"}
        </h1>
        {keywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keywords-list">{keywordText}</span>
            {keywords.length > 2 && (
              <span className="saved-news__keywords-more">
                , and {keywords.length - 2} other
                {keywords.length - 2 === 1 ? "" : "s"}
              </span>
            )}
          </p>
        )}
      </section>

      <section className="saved-news__cards">
        <div className="saved-news__grid">
          {savedArticles.map((article) => (
            <NewsCard
              key={article._id}
              article={article}
              isLoggedIn={isLoggedIn}
              onSave={() => {}}
              onDelete={onDeleteArticle}
              isSaved={true}
              savedArticleId={article._id}
              showKeyword={true}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default SavedNews;
