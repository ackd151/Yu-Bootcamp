require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const engine = require("ejs-mate");
const User = require("./models/user");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { deserializeUser } = require("passport");

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

// Config session/passport
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get("/", (req, res, next) => {
  res.render("home");
});

app.get("/login", (req, res, next) => {
  res.render("login");
});

app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const { user, error } = await User.authenticate()(username, password);
  if (!user && error) return next(error);
  req.login(user, function (err) {
    if (err) return next(err);
    res.redirect("/secrets");
  });
});

app.get("/register", (req, res, next) => {
  res.render("register");
});

app.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  User.register({ username }, password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});

app.get("/secrets", (req, res, next) => {
  if (req.isAuthenticated) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

app.listen(3000, console.log("Listening on port 3000."));
