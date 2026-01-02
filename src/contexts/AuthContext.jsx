import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const stored = window.localStorage.getItem("isLoggedIn");
      return stored === "true";
    } catch (e) {
      // localStorage unavailable, fallback to logged out
      return false;
    }
  });
  const [postLoginRedirect, setPostLoginRedirect] = useState(null);
  const [storageError, setStorageError] = useState(false);
  const [dismissedStorageError, setDismissedStorageError] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem("isLoggedIn", isLoggedIn);
      setStorageError(false);
      setDismissedStorageError(false); // Reset dismiss if storage recovers
    } catch (e) {
      setStorageError(true);
    }
  }, [isLoggedIn]);

  // Auto-hide warning if storage recovers
  useEffect(() => {
    if (!storageError) {
      setDismissedStorageError(false);
    }
  }, [storageError]);

  // Handler to dismiss the storage error warning
  const dismissStorageError = useCallback(() => {
    setDismissedStorageError(true);
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        postLoginRedirect,
        setPostLoginRedirect,
        storageError,
        dismissStorageError,
      }}
    >
      {children}
      {storageError && !dismissedStorageError && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#b71c1c",
            color: "#fff",
            padding: "12px 16px",
            textAlign: "center",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.5rem",
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          <span>
            Warning: Your browser&apos;s storage is unavailable. Login
            persistence and saved news may not work.
          </span>
          <button
            onClick={dismissStorageError}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
              fontWeight: 700,
              marginLeft: "1rem",
            }}
            aria-label="Dismiss storage warning"
            title="Dismiss"
          >
            ×
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
