import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if query is empty
    if (!query.trim()) {
      setError("Please enter a keyword");
      return;
    }

    // Clear error and submit search
    setError("");
    onSearch(query);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <section className="search">
      <div className="search__content">
        <h1 className="search__title">What's going on in the world?</h1>
        <p className="search__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form className="search__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className={`search__input ${error ? "search__input_error" : ""}`}
            placeholder="Enter topic"
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit" className="search__button">
            Search
          </button>
        </form>
        {error && <span className="search__error">{error}</span>}
      </div>
    </section>
  );
}

export default SearchForm;
