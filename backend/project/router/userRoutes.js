const express = require("express");
const router = express.Router();
const { userLogin, register } = require("../controllers/userController");
const protect = require("../middleware/authMiddleWare");

router.post("/signUp", register);
router.post("/signIn", protect, userLogin);
module.exports = router;
