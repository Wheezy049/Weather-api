const express = require("express");
const {
  getCurrentWeather,
  getWeatherForecast,
} = require("../controller/weatherController");

const weatherRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Weather data endpoints
 */

/**
 * @swagger
 * /api/weather/current/{city}:
 *   get:
 *     summary: Get current weather by city
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the city
 *     responses:
 *       200:
 *         description: Current weather data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                   example: London
 *                 temperature:
 *                   type: number
 *                   example: 22.5
 *                 condition:
 *                   type: string
 *                   example: Sunny
 *       404:
 *         description: City not found
 */
weatherRouter.get("/current/:city", getCurrentWeather);

/**
 * @swagger
 * /api/weather/forecast/{city}:
 *   get:
 *     summary: Get 5-day weather forecast by city
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the city
 *     responses:
 *       200:
 *         description: Weather forecast data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                   example: Paris
 *                 forecast:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         example: 2025-09-05
 *                       temperature:
 *                         type: number
 *                         example: 20.3
 *                       condition:
 *                         type: string
 *                         example: Rainy
 *       404:
 *         description: City not found
 */
weatherRouter.get("/forecast/:city", getWeatherForecast);

module.exports = weatherRouter;
