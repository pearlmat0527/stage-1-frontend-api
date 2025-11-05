import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({
  onSignInClick,
  isLoggedIn,
  currentUser,
  theme = "dark",
  onLogout,
}) {
  return (
    <header
      className={`header ${theme === "white" ? "header_theme_white" : ""}`}
    >
      <Navigation
        onSignInClick={onSignInClick}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        theme={theme}
        onLogout={onLogout}
      />
    </header>
  );
}

export default Header;
