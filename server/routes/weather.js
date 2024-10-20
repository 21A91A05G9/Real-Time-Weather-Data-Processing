import express from 'express';
import { getWeatherData } from '../controllers/weatherController.js';
import { getForecastData } from '../controllers/forecastController.js';


const router = express.Router();

// Route to get weather data
router.get('/', getWeatherData);

// Route to get forecast data
router.get('/forecast', getForecastData);

export default router;
