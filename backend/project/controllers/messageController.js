const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");

const ObjectId = mongoose.Types.ObjectId;

const getAllChatFromChatId = asyncHandler(async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      res.status = 400;
      throw new Error("Chat Id is messing");
    }
    const messages = await Message.find({
      chat: new ObjectId(chatId),
    })
      .sort()
      .populate("sender", "-password")
      .populate("readBy", "-password")
      .sort({ updatedAt: 1 });
    res.status(200).send(messages);
  } catch (error) {
    throw new Error(error.messages);
  }
});

module.exports = {
  getAllChatFromChatId,
};
