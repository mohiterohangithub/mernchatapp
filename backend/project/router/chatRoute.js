const express = require("express");
const protect = require("../middleware/authMiddleWare");
const {
  accessChat,
  fetchAllChats,
  renameOneOnOneChat,
  createGroupChat,
  renameGroupChat,
  addUserInGroup,
  removeUserInGroupChat,
} = require("../controllers/chatController");
const router = express.Router();

router.get("/", protect, fetchAllChats);
router.post("/", protect, accessChat);
router.put("/renameoneonone", protect, renameOneOnOneChat);
router.post("/creategroupchat", protect, createGroupChat);
router.put("/renamegroupchatname", protect, renameGroupChat);
router.post("/adduseringroup", protect, addUserInGroup);
router.post("/removeuseringroup", protect, removeUserInGroupChat);
module.exports = router;
