const asyncHandler = require("express-async-handler");

const userLogin = asyncHandler(async (req, res) => {
  console.log("req", req);
  res.status(200).json({ data: "Happy" });
});

module.exports = { userLogin };
