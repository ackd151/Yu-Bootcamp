require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const engine = require("ejs-mate");
const User = require("./models/user");
const logger = require("morgan");

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => console.log("Connected to Mongo DB."));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", engine);
app.use(express.urlencoded({ extended: true }));
app.use(logger("tiny"));

app.get("/", (req, res, next) => {
  res.render("home");
});

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ email: username });
  if (foundUser) {
    if (foundUser.password === password) {
      res.render("secrets");
    } else {
      res.send("User not validated");
    }
  }
});

app.get("/register", (req, res, next) => {
  res.render("register");
});

app.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const newUser = new User({ email: username, password });
  await newUser.save((err) => console.log(err));
  res.render("secrets");
});

app.listen(3000, console.log("Listening on port 3000."));
