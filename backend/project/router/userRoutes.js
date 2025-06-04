const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleWare");
const {
  userLogin,
  register,
  getAllUsers,
} = require("../controllers/userController");

router.post("/signUp", register);
router.post("/signIn", userLogin);
router.get("/getAllUsers", protect, getAllUsers);
module.exports = router;
