import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Import the CSS file

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric'); // Default to Celsius
  const [alertTempThreshold, setAlertTempThreshold] = useState(30); // Default threshold in Celsius
  const [alertCondition, setAlertCondition] = useState('clear'); // Default weather condition threshold
  const [alertMessage, setAlertMessage] = useState(''); // To store alert messages

  // Fetch weather data based on city and unit
  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${city}&units=${unit}`);
      setWeatherData(response.data);
      checkForAlerts(response.data); // Check if any alerts should be triggered
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData(city);
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

  // Convert temperature based on the selected unit
  const convertTemperature = (temp) => {
    if (unit === 'imperial') {
      return `${(temp * 9 / 5 + 32).toFixed(2)} °F`; // Convert Celsius to Fahrenheit
    } else if (unit === 'kelvin') {
      return `${(temp + 273.15).toFixed(2)} K`; // Convert Celsius to Kelvin
    } else {
      return `${temp.toFixed(2)} °C`; // Celsius
    }
  };

  // Check if current weather data breaches user-configured thresholds
  const checkForAlerts = (weather) => {
    let triggeredAlert = '';

    if (weather.avgTemperature > alertTempThreshold) {
      triggeredAlert += `⚠️ Alert: Temperature is above ${alertTempThreshold}°C. `;
    }

    if (weather.dominantWeather.includes(alertCondition)) {
      triggeredAlert += `⚠️ Alert: Weather condition is ${weather.dominantWeather}. `;
    }

    setAlertMessage(triggeredAlert);
  };

  // Display an alert if thresholds are breached
  useEffect(() => {
    if (weatherData) {
      checkForAlerts(weatherData);
    }
  }, [alertTempThreshold, alertCondition, weatherData]);

  return (
    <div className="weather-container">
      <div className="weather-data">
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
  
        {/* Alert Message */}
        {alertMessage && <div className="alert-message">{alertMessage}</div>}
  
        {weatherData ? (
          <div className="weather-item">
            <h3 className="weather-city">{weatherData.city}</h3>
            <table className="temperature-table">
              <thead>
                <tr>
                  <th>Average Temp</th>
                  <th>Max Temp</th>
                  <th>Min Temp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{convertTemperature(weatherData.avgTemperature)}</td>
                  <td>{convertTemperature(weatherData.maxTemperature)}</td>
                  <td>{convertTemperature(weatherData.minTemperature)}</td>
                </tr>
              </tbody>
            </table>
            <p className="weather-indicator">{weatherIndicator(weatherData.dominantWeather)}</p>
          </div>
        ) : (
          <p className="no-data">No weather data available</p>
        )}
      </div>
  
      {/* Weather Settings */}
      <div className="settings-container">
        <h2>Weather Settings</h2>
        <div className="settings-grid">
          <div className="settings-item">
            <label htmlFor="unit">Select Temperature Unit:</label>
            <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="unit-dropdown">
              <option value="metric">Celsius (°C)</option>
              <option value="imperial">Fahrenheit (°F)</option>
              <option value="kelvin">Kelvin (K)</option>
            </select>
          </div>
          <div className="settings-item">
            <label htmlFor="temp-threshold">Set Temperature Alert Threshold (°C):</label>
            <input
              type="number"
              id="temp-threshold"
              value={alertTempThreshold}
              onChange={(e) => setAlertTempThreshold(Number(e.target.value))}
              className="threshold-input"
            />
          </div>
          <div className="settings-item">
            <label htmlFor="weather-condition">Set Weather Condition Alert:</label>
            <input
              type="text"
              id="weather-condition"
              placeholder="e.g. rain, snow, clear"
              value={alertCondition}
              onChange={(e) => setAlertCondition(e.target.value)}
              className="threshold-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
