const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../backend/config/db");
const userRoute = require("./project/router/userRoutes");
const pageNotFount = require("./project/middleware/pageNotFountMiddleware");
const errorHandler = require("./project/middleware/errorMiddleware");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use("/user", userRoute);

app.use(pageNotFount);
app.use(errorHandler);
const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...!`)
);
