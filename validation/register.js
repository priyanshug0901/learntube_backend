const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty strings so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  // Name Checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name fields is required";
  }
  console.log(data);

  // Email Checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email fields is required";
  }
  // else if (!Validator.isEmpty(data.email)) {
  //   errors.email = "Email is invalid";
  // }

  // Password Checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password fields is required";
  }

  // Confirm Password
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password fields is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 10 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
