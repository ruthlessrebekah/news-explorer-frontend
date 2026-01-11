import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CurrentUserContext } from "./currentUserContext";

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = window.localStorage.getItem("currentUser");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Failed to parse currentUser from localStorage", e);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } else {
        window.localStorage.removeItem("currentUser");
      }
    } catch (e) {
      console.error("Failed to save currentUser to localStorage", e);
    }
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
