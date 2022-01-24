const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email Checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  //   else if (!Validator.isEmpty(data.email)) {
  //     errors.email = "Email is Invalid";
  //   }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
