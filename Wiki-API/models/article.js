const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = model("Article", articleSchema);
