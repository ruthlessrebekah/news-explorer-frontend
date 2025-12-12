// auth.js - Stub authentication functions
// In Stage 2/3, replace these with real fetch requests to your Express backend

/**
 * Registers a new user (stub)
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User name
 * @returns {Promise} Promise resolving to { token, user }
 */
export function register(email, password, name) {
  return new Promise((resolve) => {
    // Simulate successful registration
    const fakeToken =
      "fake_jwt_token_" + Math.random().toString(36).substr(2, 9);
    resolve({
      token: fakeToken,
      user: {
        _id: "fake-user-" + Date.now(),
        email,
        name,
      },
    });
  });
}

/**
 * Logs in a user (stub)
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Promise resolving to { token, user }
 */
export function login(email, password) {
  return new Promise((resolve) => {
    // Simulate successful login
    const fakeToken =
      "fake_jwt_token_" + Math.random().toString(36).substr(2, 9);
    resolve({
      token: fakeToken,
      user: {
        _id: "fake-user-" + Date.now(),
        email,
        name: "Fake User",
      },
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
      // Pretend the token is valid
      resolve({
        data: {
          _id: "fake-user-" + Math.random().toString(36).substr(2, 9),
          email: "user@example.com",
          name: "Fake User",
        },
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
