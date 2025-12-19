// RegisterModal.jsx
import React, { useState } from "react";
import { register } from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import closeIcon from "../../assets/images/close-icon-white.png";
import "./RegisterModal.css";

function RegisterModal({ onClose, onLogin, onRegisterSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [emailUnavailableError, setEmailUnavailableError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setEmailUnavailableError("");

    // Validate inputs
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }
    if (username.length < 2) {
      setError("Username must be at least 2 characters");
      return;
    }
    if (username.length > 30) {
      setError("Username must be 30 characters or less");
      return;
    }

    // All validation passed
    try {
      setIsLoading(true);
      // Actually call the register stub and store user/token in localStorage
      const response = await register(email, password, username);
      window.localStorage.setItem("token", response.token);
      window.localStorage.setItem("user", JSON.stringify(response.user));
      onRegisterSuccess(); // Notify parent about successful registration
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (err) {
      // Check if error is due to email already existing
      if (
        err.message === "Email already exists" ||
        err.code === "EMAIL_EXISTS"
      ) {
        setEmailUnavailableError("This email is not available");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Live email validation error (appears while typing)
  const emailError =
    email && !isValidEmail(email) ? "Invalid email address" : "";

  // Determine which error to show: live validation, email unavailable, or other error
  const displayedEmailError = emailError || emailUnavailableError;

  // Determine spacing class for the email input group based on error visibility
  const emailHasError = Boolean(displayedEmailError);
  const emailGroupClass = `RegisterModal__input-group ${
    emailHasError
      ? "RegisterModal__input-group--error"
      : "RegisterModal__input-group--no-error"
  }`;

  const isFormValid =
    email.trim() &&
    isValidEmail(email) &&
    password.trim() &&
    password.length >= 6 &&
    username.trim() &&
    username.length >= 2;

  return (
    <ModalWithForm onClose={onClose}>
      <div className="RegisterModal">
        <button onClick={onClose} className="RegisterModal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="RegisterModal__title">Sign up</h2>
        <form onSubmit={handleRegister} className="RegisterModal__form">
          <div className={emailGroupClass}>
            <label className="RegisterModal__label">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="RegisterModal__input"
            />
            {displayedEmailError && (
              <p className="RegisterModal__error">{displayedEmailError}</p>
            )}
          </div>
          <div className="RegisterModal__input-group">
            <label className="RegisterModal__label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              className="RegisterModal__input"
            />
          </div>
          <div className="RegisterModal__input-group">
            <label className="RegisterModal__label">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              maxLength={30}
              onChange={(e) => setUsername(e.target.value.slice(0, 30))}
              disabled={isLoading}
              required
              className="RegisterModal__input"
            />
          </div>
          <button
            type="submit"
            className="RegisterModal__submit"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
          {error && (
            <p className="RegisterModal__error RegisterModal__error--main">
              {error}
            </p>
          )}
        </form>
        <div className="RegisterModal__signin-container">
          or{" "}
          <button
            type="button"
            className="RegisterModal__signin-link"
            onClick={() => {
              onClose();
              onLogin();
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
