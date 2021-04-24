// Imports
const express = require("express");
const app = express();
const path = require("path");
const engine = require("ejs-mate");
const mongoose = require("mongoose");
const router = require("./routes/blog");

// Connect DB
mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => console.log("Mongo DB connected."));

// Configure view engine, paths, body parser
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// local vars middleware
app.use((req, res, next) => {
  res.locals.title = "Personal Blog";
  next();
});

// Routes
app.use("/", router);

// Basic error middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

// Start server
app.listen(3000, console.log("Listening on port 3000."));
