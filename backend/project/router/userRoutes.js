const express = require("express");
const router = express.Router();
const { userLogin, register } = require("../controllers/userController");

router.post("/signUp", register);
router.post("/signIn", userLogin);
module.exports = router;
