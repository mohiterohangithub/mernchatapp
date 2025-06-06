const express = require("express");
const cors = require("cors");
const SocketIO = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const connectDB = require("../backend/config/db");

const userRoute = require("./project/router/userRoutes");
const chatRoute = require("./project/router/chatRoute");
const messageRoute = require("./project/router/messageRoute");

const pageNotFount = require("./project/middleware/pageNotFountMiddleware");
const errorHandler = require("./project/middleware/errorMiddleware");

const {
  addUserToOnline,
  removeUserToOnline,
} = require("./project/utils/onlineUsers");

const User = require("./project/models/userModule");
const Chat = require("./project/models/chatModel");
const Message = require("./project/models/messageModel");

const ObjectId = mongoose.Types.ObjectId;

dotenv.config();
connectDB();
const app = express();

app.use(cors());

app.use(express.json());
app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...!`)
);
const io = SocketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = await User.findById(decode.id);
    next();
  } else {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  addUserToOnline(socket.user._id, socket.id);

  socket.on("join room", async (chatId) => {
    const verifyChatId = await Chat.findOne({
      _id: new ObjectId(chatId),
      users: { $elemMatch: { $eq: new ObjectId(socket.user._id) } },
    });
    if (verifyChatId._id) {
      socket.join(chatId);
    } else {
      throw new Error("Chat Id or user not belong to chat");
    }
  });

  socket.on("send-private-message", async (senderData) => {
    const { chatId, message } = senderData;
    if (!chatId && !message) {
      throw new Error("Chat Id or message is missing");
    }
    const msg = await Message.create({
      sender: socket.user._id,
      content: message,
      chat: chatId,
      readBy: [socket.user._id],
    });
    socket.to(chatId).emit("receive-private-message", msg);
  });

  socket.on("disconnect", () => {
    removeUserToOnline(socket.id);
  });
});

app.use(pageNotFount);
app.use(errorHandler);
