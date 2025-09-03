const axios = require("axios");

const API_KEY = process.env.WEATHER_API_KEY;

async function getCoordinates(city) {
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

  const geoResponse = await axios.get(geoUrl);

  if (geoResponse.data.length === 0) {
    throw new Error("City not found");
  }

  return geoResponse.data[0];
}

async function getCurrentWeather(req, res) {
  const city = req.params.city;

  try {
    const { lat, lon, name, country } = await getCoordinates(city);
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const weatherResponse = await axios.get(weatherUrl);
    console.log(weatherResponse.data);
    res.json({
      location: `${name}, ${country}`,
      coordinates: { lat, lon },
      temperature: weatherResponse.data.main.temp,
      feels_like: weatherResponse.data.main.feels_like,
      humidity: weatherResponse.data.main.humidity,
      wind_speed: weatherResponse.data.wind.speed,
      description: weatherResponse.data.weather[0].description,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Unable to fetch current weather" });
  }
}

async function getWeatherForecast(req, res) {
  const city = req.params.city;

  try {
    const { lat, lon, name, country } = await getCoordinates(city);
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const forecastResponse = await axios.get(forecastUrl);
    console.log(forecastResponse.data);
    const forecastData = forecastResponse.data.list.map((item) => ({
      date: item.dt_txt,
      temperature: item.main.temp,
      feels_like: item.main.feels_like,
      description: item.weather[0].description,
      humidity: item.main.humidity,
      wind_speed: item.wind.speed,
    }));

    res.json({
      location: `${name}, ${country}`,
      coordinates: { lat, lon },
      forecast: forecastData,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Unable to fetch forecast" });
  }
}

module.exports = {
  getCurrentWeather,
  getWeatherForecast,
};
