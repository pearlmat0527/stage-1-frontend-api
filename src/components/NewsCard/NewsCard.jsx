import { useState } from "react";
import saveIconEmpty from "../../images/Save_unselected.svg";
import saveIconFilled from "../../images/Save_selected.svg";
import trashIcon from "../../images/Trash_icon_unselected.svg";
import "./NewsCard.css";
import saveIconHover from "../../images/Save_hover.svg";

function NewsCard({
  article,
  isLoggedIn,
  onSave,
  onDelete,
  isSaved = false,
  savedArticleId,
  showKeyword = false,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // ADD THESE DEBUG LINES
  console.log("NewsCard - showKeyword:", showKeyword);
  console.log("NewsCard - article.keyword:", article.keyword);
  console.log("NewsCard - full article:", article);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  const handleSaveClick = () => {
    if (isLoggedIn) {
      if (isSaved) {
        // Delete the article
        onDelete(savedArticleId);
      } else {
        // Save the article
        onSave(article);
      }
    } else {
      // Show tooltip when user clicks while not logged in
      setShowTooltip(true);
      // Hide tooltip after 2 seconds
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isLoggedIn && !showKeyword) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
  };

  return (
    <article className="news-card">
      <img
        src={article.urlToImage || "https://via.placeholder.com/400x272"}
        alt={article.title}
        className="news-card__image"
      />
      <div className="news-card__content">
        <p className="news-card__date">{formatDate(article.publishedAt)}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">
          {article.description || article.text || "No description available"}
        </p>
        <p className="news-card__source">
          {article.source?.name || article.source}
        </p>
      </div>

      {/* Show keyword badge on saved-news page */}
      {showKeyword && article.keyword && (
        <div className="news-card__keyword">{article.keyword}</div>
      )}

      <div className="news-card__save-container">
        <button
          className={`news-card__save-button ${
            !isLoggedIn ? "news-card__save-button_inactive" : ""
          }`}
          onClick={handleSaveClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={false}
        >
          {showKeyword ? (
            // Show trash icon on saved-news page
            <img
              src={trashIcon}
              alt="Delete article"
              className="news-card__save-icon"
            />
          ) : (
            <img
              src={
                isSaved
                  ? saveIconFilled
                  : isHovered
                  ? saveIconHover
                  : saveIconEmpty
              }
              alt={isSaved ? "Remove from saved" : "Save article"}
              className="news-card__save-icon"
            />
          )}
        </button>
        {showTooltip && (
          <span className="news-card__tooltip">Sign in to save articles</span>
        )}
      </div>
    </article>
  );
}

export default NewsCard;
