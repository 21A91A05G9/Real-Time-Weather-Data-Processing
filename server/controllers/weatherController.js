import { fetchWeatherData } from '../services/weatherService.js';

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const updateWeatherData = async () => {
    for (const city of cities) {
        const data = await fetchWeatherData(city);
        const temp = data.main.temp - 273.15; // Convert from Kelvin to Celsius
        const weatherCondition = data.weather[0].main;

        // Logic to save or update the weather data in MongoDB...
    }
};

export { updateWeatherData };
