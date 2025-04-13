const jwt = require("jsonwebtoken");
const User = require("../models/userModule");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req?.headers?.authorization &&
    req?.headers?.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = User.findById(decode).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("No Token Found, not authorized");
    }
  } else {
    res.status(401);
    throw new Error("No Token Found, not authorized");
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;
