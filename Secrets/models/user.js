const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
mongoose.set("useCreateIndex", true);

const userSchema = new Schema({
  email: String,
  password: String,
  secrets: [String],
});

userSchema.plugin(passportLocalMongoose);

module.exports = new model("User", userSchema);
