import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { searchNews } from "../../utils/NewsApi";
import { authorize, register } from "../../utils/auth";
import "../../vendor/font.css";
import "./App.css";

function AppContent() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const savedUser = localStorage.getItem("currentUser");

    console.log("Checking login on mount - token:", token);
    console.log("Checking login on mount - savedUser:", savedUser);

    if (token && savedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(savedUser));
      console.log("User is logged in:", JSON.parse(savedUser));
    }
  }, []);

  const handleOpenLoginModal = () => setActiveModal("login");
  const handleOpenRegisterModal = () => setActiveModal("register");
  const handleCloseModal = () => setActiveModal(null);

  // Handle search submission
  const handleSearch = (query) => {
    setIsLoading(true);
    setSearchError(null);
    setHasSearched(true);
    setArticles([]);
    setCurrentKeyword(query);

    searchNews(query)
      .then((newsArticles) => {
        setArticles(newsArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setSearchError(
          "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
        );
        setIsLoading(false);
        setArticles([]);
      });
  };

  // Handle login with navigation
  const handleLogin = (email, password) => {
    authorize(email, password)
      .then((res) => {
        console.log("Login successful:", res);

        // Save token
        localStorage.setItem("jwt", res.token);

        // Save user data
        const user = { email: email };
        localStorage.setItem("currentUser", JSON.stringify(user));

        console.log("Saved to localStorage - token:", res.token);
        console.log("Saved to localStorage - user:", JSON.stringify(user));

        // Update state
        setIsLoggedIn(true);
        setCurrentUser(user);
        handleCloseModal();

        // Navigate to saved-news page after successful login
        navigate("/saved-news");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert(err.message);
      });
  };

  // Handle registration - ONLY register, don't log in
  const handleRegister = (email, password, username) => {
    register(email, password, username)
      .then((res) => {
        console.log("Registration successful:", res);
        // DO NOT save token or user data
        // DO NOT set isLoggedIn to true
        // DO NOT navigate anywhere
        // The RegisterModal will handle showing the success message
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        alert(err.message);
      });
  };

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("jwt");
    localStorage.removeItem("currentUser");

    // Update state
    setIsLoggedIn(false);
    setCurrentUser(null);

    // Navigate to home page
    navigate("/");

    console.log("User logged out");
  };

  // Handle saving an article
  const handleSaveArticle = (article) => {
    const newSavedArticle = {
      ...article,
      keyword: currentKeyword,
      _id: `saved-${Date.now()}`,
    };
    setSavedArticles([...savedArticles, newSavedArticle]);
    console.log("Article saved:", newSavedArticle);
  };

  // Handle deleting a saved article
  const handleDeleteArticle = (articleId) => {
    setSavedArticles(
      savedArticles.filter((article) => article._id !== articleId)
    );
    console.log("Article deleted:", articleId);
  };

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="page__hero">
                <Header
                  onSignInClick={handleOpenLoginModal}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onLogout={handleLogout}
                />
                <SearchForm onSearch={handleSearch} />
              </div>
              <Main
                articles={articles}
                isLoading={isLoading}
                searchError={searchError}
                hasSearched={hasSearched}
                isLoggedIn={isLoggedIn}
                onSaveArticle={handleSaveArticle}
                onDeleteArticle={handleDeleteArticle}
                savedArticles={savedArticles}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-news"
          element={
            <>
              <Header
                onSignInClick={handleOpenLoginModal}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                theme="white"
                onLogout={handleLogout}
              />
              <SavedNews
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                savedArticles={savedArticles}
                onDeleteArticle={handleDeleteArticle}
              />
              <Footer />
            </>
          }
        />
      </Routes>

      {/* Modals */}
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={handleCloseModal}
        onSignUpClick={handleOpenRegisterModal}
        onLogin={handleLogin}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={handleCloseModal}
        onSignInClick={handleOpenLoginModal}
        onRegister={handleRegister}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/stage-1-frontend-api">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
