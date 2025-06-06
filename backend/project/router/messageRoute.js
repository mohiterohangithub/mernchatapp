const express = require("express");
const protect = require("../middleware/authMiddleWare");
const { getAllChatFromChatId } = require("../controllers/messageController");

const router = express.Router();

router.post("/getAllMessage", protect, getAllChatFromChatId);

module.exports = router;
