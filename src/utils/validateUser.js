/**
 * Validates a user object for required fields, types, and format.
 * @param {object} user - The user object to validate
 * @returns {{ isValid: boolean, errors: string[] }}
 */
function validateUser(user) {
  const errors = [];

  // Check if user is a valid object
  if (!user || typeof user !== "object") {
    errors.push("User data is not a valid object.");
    return { isValid: false, errors };
  }

  // Required fields and checks
  const requiredFields = ["_id", "email", "name"];
  requiredFields.forEach((field) => {
    if (
      !Object.prototype.hasOwnProperty.call(user, field) ||
      typeof user[field] !== "string" ||
      !user[field].trim()
    ) {
      errors.push(`Field '${field}' is missing or not a non-empty string.`);
    }
  });

  // Email format validation (only if email is present and valid string)
  if (user.email && typeof user.email === "string" && user.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      errors.push("Email format is invalid.");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export default validateUser;
