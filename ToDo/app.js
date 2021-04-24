const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo");
const engine = require("ejs-mate");
const logger = require("morgan");
const methodOverride = require("method-override");

// Connect mongodb
mongoose.connect("mongodb://localhost:27017/todoListDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => console.log("Mongo DB connected."));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.engine("ejs", engine);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// morgan logger middleware
app.use(logger("tiny"));
// method override middleware
app.use(methodOverride("_method"));

// Mount routes
app.use("/", todoRoutes);

app.listen(3000, console.log("Listening on port 3000."));
