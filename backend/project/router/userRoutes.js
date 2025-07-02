const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleWare");
const upload = require("../middleware/fileUploadMiddleWare");

// Controllers
const {
  userLogin,
  register,
  getAllUsers,
  getUserInfo,
} = require("../controllers/userController");

router.post("/signUp", upload.single("image"), register);
router.post("/signIn", userLogin);
router.get("/getAllUsers", protect, getAllUsers);
router.get("/getUserInfo", protect, getUserInfo);
module.exports = router;
