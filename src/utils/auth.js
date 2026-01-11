// auth.js - Stub authentication functions
// In Stage 2/3, replace these with real fetch requests to your Express backend

import validateUser from "./validateUser";

/**
 * Registers a new user (stub)
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User name
 * @returns {Promise} Promise resolving to { token, user }
 */
export function register(email, password, name) {
  return new Promise((resolve, reject) => {
    const user = {
      _id: "fake-user-" + Date.now(),
      email,
      name,
    };

    const validation = validateUser(user);
    if (!validation.isValid) {
      reject({
        message: "User validation failed",
        errors: validation.errors,
        user,
      });
      return;
    }

    const fakeToken =
      "fake_jwt_token_" + Math.random().toString(36).substr(2, 9);
    window.localStorage.setItem("lastRegisteredUsername", name);
    resolve({
      token: fakeToken,
      user,
    });
  });
}

/**
 * Logs in a user (stub)
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Promise resolving to { token, user }
 */
export function login(email) {
  return new Promise((resolve, reject) => {
    // Simulate successful login
    const fakeToken =
      "fake_jwt_token_" + Math.random().toString(36).substr(2, 9);
    // Retrieve the last registered username for demo purposes
    const lastRegisteredUsername =
      window.localStorage.getItem("lastRegisteredUsername") || "Fake User";
    const user = {
      _id: "fake-user-" + Date.now(),
      email,
      name: lastRegisteredUsername,
    };

    const validation = validateUser(user);
    if (!validation.isValid) {
      reject({
        message: "User validation failed",
        errors: validation.errors,
        user,
      });
      return;
    }

    resolve({
      token: fakeToken,
      user,
    });
  });
}

/**
 * Checks if a token is valid (stub)
 * @param {string} token - JWT token to validate
 * @returns {Promise} Promise resolving to user data if valid
 */
export function checkToken(token) {
  return new Promise((resolve, reject) => {
    if (token && token.startsWith("fake_jwt_token_")) {
      const user = {
        _id: "fake-user-" + Math.random().toString(36).substr(2, 9),
        email: "user@example.com",
        name: "Fake User",
      };
      const validation = validateUser(user);
      if (!validation.isValid) {
        reject({
          message: "User validation failed",
          errors: validation.errors,
          user,
        });
        return;
      }
      resolve({
        data: user,
      });
    } else {
      reject(new Error("Invalid token"));
    }
  });
}

/**
 * Logs out a user (stub)
 * @returns {Promise} Promise resolving when logout is complete
 */
export function logout() {
  return new Promise((resolve) => {
    // Clear token from localStorage (handled in component)
    resolve({ message: "Logged out successfully" });
  });
}
