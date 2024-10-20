import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState('');

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  const fetchForecastData = async (city) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/forecast?city=${city}`);
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      setForecastData([]);
    }
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData(city);
      fetchForecastData(city);
    }
  };

  const weatherIndicator = (condition) => {
    if (condition.includes("rain")) {
      return "🌧️ Rainy";
    } else if (condition.includes("clear") || condition.includes("sun")) {
      return "☀️ Sunny";
    } else if (condition.includes("wind")) {
      return "💨 Windy";
    }
    return "🌈 Partly Cloudy";
  };

  return (
    <div className="weather-container">
      <h1 className="title">Weather Monitoring System</h1>
      
      <form onSubmit={handleCitySearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {weatherData ? (
        <div className="weather-item">
          <h3 className="weather-city">{weatherData.city}</h3>
          <table className="temperature-table">
            <thead>
              <tr>
                <th>Average Temp (°C)</th>
                <th>Max Temp (°C)</th>
                <th>Min Temp (°C)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{weatherData.avgTemperature.toFixed(2)}</td>
                <td>{weatherData.maxTemperature.toFixed(2)}</td>
                <td>{weatherData.minTemperature.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
       
          <p className="weather-indicator">{weatherIndicator(weatherData.dominantWeather)}</p>
        </div>
      ) : (
        <p className="no-data">No weather data available</p>
      )}

      {forecastData.length > 0 && (
        <div className="forecast">
          <h2>Weekly Forecast</h2>
          {forecastData.map((day, index) => (
            <div key={index} className="forecast-item">
              <p>{new Date(day.date).toLocaleDateString()}: {day.dominantWeather}</p>
              <p>Max: {day.maxTemperature.toFixed(2)} °C, Min: {day.minTemperature.toFixed(2)} °C</p>
              <p className="forecast-indicator">{weatherIndicator(day.dominantWeather)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
