const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("../backend/config/db");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...!`)
);
