const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModule");

const ObjectId = mongoose.Types.ObjectId;

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      res.status(401);
      throw new Error("user is missing");
    }
    let isChat = await Chat.findOne({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email pic",
    });

    if (isChat) {
      res.status(200).send(isChat);
    } else {
      try {
        const newChat = await Chat.create({
          isGroupChat: false,
          chatName: "Friends",
          users: [userId, req.user._id],
        });

        const fullChat = await Chat.findOne({ _id: newChat._id }).populate(
          "users",
          "-password"
        );

        res.status(200).send(fullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const renameOneOnOneChat = asyncHandler(async (req, res) => {
  try {
    const { chatId } = req.body;
    if (!chatId) {
      res.status(401).send("Chat Id is Missing..!");
    }
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: req.body.chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("latestMessage");
    res.status(200).send(chat);
  } catch (error) {
    res.statusCode = 400;
    throw new Error(error.message);
  }
});
const fetchAllChats = asyncHandler(async (req, res) => {
  try {
    const allChats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });
    res.status(200).send(allChats);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  try {
    if (!req.body.users && !req.body.chatName) {
      res.status(401);
      throw new Error("Missing information ...!");
    }
    const users = JSON.parse(req.body.users);
    if (users.length < 2) {
      res.status(401);
      throw new Error("Please select more than two users");
    }

    const newGroup = await Chat.create({
      isGroupChat: true,
      chatName: req.body.chatName,
      users: [...users, req.user._id],
      groupAdmin: req.user._id,
    });
    const newGroupChat = await Chat.findById(newGroup._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(newGroupChat);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});
const renameGroupChat = asyncHandler(async (req, res) => {
  try {
    if (!req.body.isGroupChat && !req.body.chatName && !req.body.chatId) {
      res.status(401);
      throw new Error("Information missing...!");
    }
    const { chatId, chatName } = req.body;
    const groupChatName = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("latestMessage");

    res.status(200).send(groupChatName);
  } catch (error) {
    res.status(401);
    throw new Error(error.message);
  }
});

const addUserInGroup = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;

  if (!userId && !chatId) {
    res.status(400);
    throw new Error("Please send all information");
  }

  try {
    let group = await Chat.findById(chatId);

    if (!group.isGroupChat) {
      res.status(400);
      throw new Error("This is not a group chat");
    }

    group = await Chat.findOne({
      _id: new ObjectId(chatId),
      users: { $elemMatch: { $eq: new ObjectId(userId) } },
    });

    if (group) {
      res.status(400);
      throw new Error("User Already part of this group");
    }

    group = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("latestMessage");
    res.status(200).send(group);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = {
  accessChat,
  fetchAllChats,
  renameOneOnOneChat,
  createGroupChat,
  renameGroupChat,
  addUserInGroup,
};
