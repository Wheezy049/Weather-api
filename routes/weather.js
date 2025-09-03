const express = require("express");
const {
  getCurrentWeather,
  getWeatherForecast,
} = require("../controller/weatherController");

const weatherRouter = express.Router();

weatherRouter.get("/current/:city", getCurrentWeather);

weatherRouter.get("/forecast/:city", getWeatherForecast);

module.exports = weatherRouter;
