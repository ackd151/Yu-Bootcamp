const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
