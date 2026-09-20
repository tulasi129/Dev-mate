const validator = require("validator");

const userSignUpValidator = function (req) {
  const { firstName, lastName, email, password } = req;

  if (!firstName || !lastName) {
    throw new Error("First name or last name required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email id");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const userLoginValidator = function (req) {
  const {email, password } = req;

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email id");
  }

  if (!password) {
    throw new Error("Password is not strong");
  }
};

module.exports = {userSignUpValidator, userLoginValidator}
