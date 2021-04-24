const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Todo = require("../models/todo");

const listSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

listSchema.pre("remove", async function () {
  await Todo.remove({
    _id: {
      $in: this.todos,
    },
  });
});

const List = model("List", listSchema);
module.exports = List;
