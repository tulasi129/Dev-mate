const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  const { token } = await req.cookies;

  if (!token) {
    throw new Error("Invalid token, Please login!!!");
  }

  const tokenValidation = await jwt.verify(token, "dev-mate");

  const { _id } = tokenValidation;

  const user = await User.findById(_id);

  if (!user) {
    throw new Error("User not found");
  }

  req.user = user;

  next();
};

module.exports = auth;