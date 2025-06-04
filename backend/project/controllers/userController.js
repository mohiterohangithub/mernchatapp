const asyncHandler = require("express-async-handler");
const User = require("../models/userModule");

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.json({
      _id: user?.id,
      name: user.name,
      email: user.email,
      isAdmin: user?.isAdmin,
      pic: user?.pic,
      token: await user.generateJWTToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

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

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = { userLogin, register, getAllUsers };
