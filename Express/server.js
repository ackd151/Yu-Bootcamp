require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const engine = require("ejs-mate");
// Require Routes
const bmiCalc = require("./routes/bmiCalc");
const apiWeath = require("./routes/apiWeather");

app.engine("ejs", engine);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// local vars middleware
app.use((req, res, next) => {
  res.locals.title = "Express Server Intro";
  next();
});

// Mount Routes
app.use("/bmi-calculator", bmiCalc);
app.use("/weather", apiWeath);

app.get("/", (req, res, next) => {
  res.render("index");
});

app.listen(3000, console.log("Listening on port 3000"));
