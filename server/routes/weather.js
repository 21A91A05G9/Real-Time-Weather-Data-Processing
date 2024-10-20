import express from 'express';
import { updateWeatherData } from '../controllers/weatherController.js';

const router = express.Router();

// Endpoint to manually trigger data update
router.get('/update', updateWeatherData);

export default router;
