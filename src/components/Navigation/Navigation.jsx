import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoutIcon from "../../images/logout.svg";
import "./Navigation.css";

function Navigation({
  onSignInClick,
  isLoggedIn,
  currentUser,
  theme = "dark",
  onLogout,
}) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userName =
    currentUser?.name || currentUser?.email?.split("@")[0] || "User";

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`navigation ${
          theme === "white" ? "navigation_theme_white" : ""
        }`}
      >
        <Link to="/" className="navigation__logo">
          NewsExplorer
        </Link>

        {/* Hamburger button */}
        <button
          className="navigation__hamburger"
          onClick={handleMenuToggle}
          aria-label="Menu"
        >
          <span className="navigation__hamburger-line"></span>
          <span className="navigation__hamburger-line"></span>
          <span className="navigation__hamburger-line"></span>
        </button>

        {/* Desktop navigation */}
        <ul className="navigation__links">
          <li>
            <Link
              to="/"
              className={`navigation__link ${
                location.pathname === "/" ? "navigation__link_active" : ""
              }`}
            >
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link
                to="/saved-news"
                className={`navigation__link ${
                  location.pathname === "/saved-news"
                    ? "navigation__link_active"
                    : ""
                }`}
              >
                Saved articles
              </Link>
            </li>
          )}
          <li>
            {isLoggedIn ? (
              <button
                className="navigation__button navigation__button_user"
                onClick={onLogout}
              >
                {userName}
                <img
                  src={logoutIcon}
                  alt="Logout"
                  className="navigation__button-icon"
                />
              </button>
            ) : (
              <button className="navigation__button" onClick={onSignInClick}>
                Sign in
              </button>
            )}
          </li>
        </ul>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="navigation__mobile-menu">
          <div className="navigation__mobile-header">
            <Link
              to="/"
              className="navigation__mobile-logo"
              onClick={handleMenuClose}
            >
              NewsExplorer
            </Link>
            <button
              className="navigation__mobile-close"
              onClick={handleMenuClose}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <ul className="navigation__mobile-links">
            <li>
              <Link
                to="/"
                className={`navigation__mobile-link ${
                  location.pathname === "/"
                    ? "navigation__mobile-link_active"
                    : ""
                }`}
                onClick={handleMenuClose}
              >
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to="/saved-news"
                  className={`navigation__mobile-link ${
                    location.pathname === "/saved-news"
                      ? "navigation__mobile-link_active"
                      : ""
                  }`}
                  onClick={handleMenuClose}
                >
                  Saved articles
                </Link>
              </li>
            )}
            <li>
              {isLoggedIn ? (
                <button
                  className="navigation__mobile-button"
                  onClick={() => {
                    onLogout();
                    handleMenuClose();
                  }}
                >
                  {userName}
                  <img
                    src={logoutIcon}
                    alt="Logout"
                    className="navigation__button-icon"
                  />
                </button>
              ) : (
                <button
                  className="navigation__mobile-button"
                  onClick={() => {
                    onSignInClick();
                    handleMenuClose();
                  }}
                >
                  Sign in
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navigation;
