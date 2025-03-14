const express = require("express");
const router = express.Router();
const { userLogin, register } = require("../controllers/userController");

router.get("/", userLogin);
router.post("/signUp", register);

module.exports = router;
