// LoginModal.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import closeIcon from "../../assets/images/close-icon-white.png";
import { useAuth } from "../../hooks/useAuth";
import { login } from "../../utils/auth";
import "./LoginModal.css";

function LoginModal({ onClose, onRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Removed verification modal flow per requirements
  const { login: authLogin } = useAuth();

  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

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

    // All validation passed, attempt login
    setIsLoading(true);
    try {
      const response = await login(email, password);

      // Do not gate login on email verification

      // Store token in localStorage for persistence
      window.localStorage.setItem("token", response.token);
      window.localStorage.setItem("user", JSON.stringify(response.user));
      // Update auth context
      authLogin();
      // Clear form and close modal
      setEmail("");
      setPassword("");
      onClose();
      if (onLoginSuccess) {
        onLoginSuccess(response.user);
      }
    } catch (err) {
      // Handle specific error cases; do not show verification modal
      if (err.code === "USER_NOT_FOUND" || err.message.includes("not found")) {
        setError("Email or password is incorrect");
      } else if (
        err.code === "INVALID_CREDENTIALS" ||
        err.message.includes("incorrect")
      ) {
        setError("Email or password is incorrect");
      } else if (
        err.code === "EMAIL_NOT_VERIFIED" ||
        err.message.includes("not verified")
      ) {
        // Treat as invalid credentials per requirement
        setError("Email or password is incorrect");
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form is valid
  const isFormValid =
    email.trim() &&
    isValidEmail(email) &&
    password.trim() &&
    password.length >= 6;

  // Live email validation error (appears while typing)
  const emailError =
    email && !isValidEmail(email) ? "Invalid email address" : "";
  const emailHasError = Boolean(emailError || error);
  const emailGroupClass = `LoginModal__input-group ${
    emailHasError
      ? "LoginModal__input-group--error"
      : "LoginModal__input-group--no-error"
  }`;
  const submitButtonClass = emailHasError
    ? "LoginModal__submit LoginModal__submit--error"
    : "LoginModal__submit LoginModal__submit--no-error";

  // Verification modal removed

  return (
    <ModalWithForm onClose={onClose}>
      <div className="LoginModal">
        <button onClick={onClose} className="LoginModal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="LoginModal__title">Sign in</h2>
        <form onSubmit={handleLogin}>
          <div className={emailGroupClass}>
            <label className="LoginModal__label">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
            {(emailError || (error && !emailError)) && (
              <p className="LoginModal__error">{emailError || error}</p>
            )}
          </div>
          <div className="LoginModal__input-group">
            <label className="LoginModal__label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <button
            type="submit"
            className={submitButtonClass}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="LoginModal__register-container">
          or{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onRegister();
            }}
            className="LoginModal__register-link"
            disabled={isLoading}
          >
            Sign up
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
}

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginModal;
