const express = require("express");
const path = require("path");
const cors = require("cors");
const SocketIO = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const fs = require("fs");

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
const { allowedOrigins } = require("./project/utils/constants");

const User = require("./project/models/userModule");
const Chat = require("./project/models/chatModel");
const Message = require("./project/models/messageModel");

const ObjectId = mongoose.Types.ObjectId;

dotenv.config();
connectDB();
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // allow
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const uploadsDir = path.join(__dirname, "project", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", express.static(path.join(__dirname, "project", "uploads")));

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
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // allow
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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

  socket.on("leave-room", (roomName) => {
    socket.leave(roomName);
  });

  socket.on("send-private-message", async (senderData) => {
    const { chatId, message } = senderData;
    if (!chatId && !message) {
      throw new Error("Chat Id or message is missing");
    }
    let msg = await Message.create({
      sender: socket.user._id,
      content: message,
      chat: chatId,
      readBy: [socket.user._id],
    });
    msg = await Message.populate(msg, {
      path: "sender",
      select: "name email",
    });
    io.to(chatId).emit("receive-private-message", msg);
  });

  socket.on("disconnect", () => {
    removeUserToOnline(socket.id);
  });
});

app.use(pageNotFount);
app.use(errorHandler);
