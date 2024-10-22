import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Function to fetch weather data for a specific city
export const getWeatherData = async (req, res) => {
  const { city } = req.query; // Get the city from query parameters
  
  if (!city) {
    return res.status(400).json({ message: 'City name is required' });
  }
  
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`);
    
    const weatherData = {
      city: response.data.name,
      avgTemperature: response.data.main.temp,
      maxTemperature: response.data.main.temp_max,
      minTemperature: response.data.main.temp_min,
      dominantWeather: response.data.weather[0].description,
      humidity: response.data.main.humidity,        
      windSpeed: response.data.wind.speed,         
      date: response.data.dt * 1000,                
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};
