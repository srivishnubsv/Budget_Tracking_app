// filepath: budget-tracking-app/budget-tracking-app/src/utils/helper.js

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 6; // Example: password must be at least 6 characters
};

export const showToast = (message, type) => {
  // Placeholder for toast functionality
  console.log(`${type}: ${message}`);
};