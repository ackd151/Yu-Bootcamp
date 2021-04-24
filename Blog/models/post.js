const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
