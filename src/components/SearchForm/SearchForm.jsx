// SearchForm.jsx
import React from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [value, setValue] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setSubmitting(true);
    onSearch(value.trim());
    setTimeout(() => setSubmitting(false), 250);
  };

  return (
    <div className="SearchForm__bar">
      <form className="SearchForm__form" onSubmit={handleSubmit}>
        <input
          className="SearchForm__input"
          type="text"
          placeholder="Enter topic"
          value={value}
          onChange={handleInputChange}
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
          disabled={!value.trim()}
          onMouseDown={() => value.trim() && setSubmitting(true)}
          onMouseUp={() =>
            value.trim() && setTimeout(() => setSubmitting(false), 250)
          }
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
