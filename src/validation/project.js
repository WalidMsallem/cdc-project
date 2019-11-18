const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProjectInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.organizer = !isEmpty(data.organizer) ? data.organizer : "";
  data.thematic = !isEmpty(data.thematic) ? data.thematic : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
