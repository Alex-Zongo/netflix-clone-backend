const validator = require("validator");
const isEmpty = require("is-empty");

function validateRegisterInput(data) {
  let errors = {};

  // empty fields
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // username check
  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  // password check
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateRegisterInput;
