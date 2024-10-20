const axios = require('axios');

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

const fetchWeatherData = async (city) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    return response.data;
};

module.exports = { fetchWeatherData };
