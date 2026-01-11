// SearchForm.jsx
import React from "react";
import PropTypes from "prop-types";
import "./SearchForm.css";

const MAX_LENGTH = 100;

function SearchForm({ onSearch }) {
  const [value, setValue] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length > MAX_LENGTH) return;
    setValue(newValue);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!value.trim()) {
      setError("Please enter a keyword");
      return;
    }
    if (value.length > MAX_LENGTH) {
      setError(`Search term must be ${MAX_LENGTH} characters or less`);
      return;
    }
    setSubmitting(true);
    setError("");
    onSearch(value.trim());
    setTimeout(() => setSubmitting(false), 250);
  };

  return (
    <div className="SearchForm__bar">
      <div className="SearchForm__bar-inner">
        <form className="SearchForm__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="search-input" className="visually-hidden">
            Search keyword
          </label>
          <input
            id="search-input"
            className="SearchForm__input"
            type="text"
            placeholder="Enter topic"
            value={value}
            onChange={handleInputChange}
            aria-describedby={error ? "search-error" : undefined}
            aria-invalid={!!error}
            maxLength={MAX_LENGTH}
          />
          <button
            className={`SearchForm__button ${
              value.trim()
                ? `SearchForm__button--ready ${
                    submitting ? "SearchForm__button--active" : ""
                  }`
                : "SearchForm__button--idle"
            }`}
            type="submit"
            disabled={submitting}
          >
            Search
          </button>
        </form>
        {error && (
          <div className="SearchForm__error" role="alert" id="search-error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
