const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCollaboraterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
