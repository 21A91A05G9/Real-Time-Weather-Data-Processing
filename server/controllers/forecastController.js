import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Function to fetch weekly forecast data for a specific city
export const getForecastData = async (req, res) => {
  const { city } = req.query; // Get the city from query parameters
  
  if (!city) {
    return res.status(400).json({ message: 'City name is required' });
  }
  
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`);
    
    const forecastData = response.data.list.map(item => ({
      date: item.dt * 1000, // Convert to milliseconds
      maxTemperature: item.main.temp_max,
      minTemperature: item.main.temp_min,
      dominantWeather: item.weather[0].description,
    }));

    // Get data for the next 7 days
    const weeklyForecast = forecastData.filter((_, index) => index % 8 === 0).slice(0, 7);

    res.json(weeklyForecast);
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    res.status(500).json({ message: 'Error fetching forecast data' });
  }
};
