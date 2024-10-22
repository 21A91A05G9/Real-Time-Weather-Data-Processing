import express from 'express';
import { getWeatherData } from '../controllers/weatherController.js';


const router = express.Router();

// Route to get weather data
router.get('/', getWeatherData);

export default router;
