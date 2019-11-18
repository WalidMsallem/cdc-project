const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const AdminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now
  }
});

module.exports = admin = mongoose.model("admin", AdminSchema);
