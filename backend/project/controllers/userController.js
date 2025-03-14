const asyncHandler = require("express-async-handler");
const User = require("../models/userModule");

const userLogin = asyncHandler(async (req, res) => {});

const register = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please entre All the Fields");
  }

  const userExists = await User.find({ email });
  if (userExists.length > 0) {
    res.status(400);
    throw new Error("User Already exists");
  }

  const newUser = await User.create({
    name: name,
    email: email,
    password: password,
    pic: pic,
  });
  if (newUser) {
    const token = await newUser.generateJWTToken();
    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});

module.exports = { userLogin, register };
