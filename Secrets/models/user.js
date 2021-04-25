const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const encrypt = require("mongoose-encryption");

const userSchema = new Schema({
  email: String,
  password: String,
});

userSchema.plugin(encrypt, {
  secret: process.env.SECRET,
  encryptedFields: ["password"],
});

module.exports = new model("User", userSchema);
