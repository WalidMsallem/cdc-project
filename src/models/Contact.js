const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ContactSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  contain: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = admin = mongoose.model("contact", ContactSchema);