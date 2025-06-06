const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleWare");
const {
  userLogin,
  register,
  getAllUsers,
  getUserInfo,
} = require("../controllers/userController");

router.post("/signUp", register);
router.post("/signIn", userLogin);
router.get("/getAllUsers", protect, getAllUsers);
router.get("/getUserInfo", protect, getUserInfo);
module.exports = router;
