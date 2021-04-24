const { response } = require("express");
const https = require("https");
const key = process.env.openweatherapi_key;

module.exports = {
  getWeatherForm(req, res, next) {
    res.render("api-weather/api-weath-form", { title: "API Weather Request" });
  },

  weatherResult(req, res, next) {
    // make api call to get weather
    const { location } = req.body;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=imperial`;
    https
      .get(url, (response) => {
        response.on("data", (data) => {
          let result = JSON.parse(data);
          res.render("api-weather/api-weather-result", {
            location,
            result,
            title: "API Weather Response",
          });
        });
      })
      .on("error", (err) => {
        console.log("ERROR: " + err);
      });
    // res.redirect("back");
  },
};
