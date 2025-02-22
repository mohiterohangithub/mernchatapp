const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModule = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pic: { type: String },
});

module.exports = mongoose.Model("User", userModule);
