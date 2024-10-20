import axios from 'axios';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

const fetchWeatherData = async (city) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export { fetchWeatherData };
