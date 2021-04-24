const express = require("express");
const router = express.Router();
const { getWeatherForm, weatherResult } = require("../contollers/apiWeather");

router.get("/", getWeatherForm);

router.post("/", weatherResult);

module.exports = router;
