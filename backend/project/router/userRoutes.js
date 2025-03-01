const express = require("express");
const router = express.Router();
const { userLogin } = require("../controllers/userController");

router.get("/", userLogin);

module.exports = router;
