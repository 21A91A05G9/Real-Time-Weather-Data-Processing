import express from 'express';
import WeatherSummary from '../models/weatherSummary'; 

const router = express.Router();

// GET weather summary from MongoDB
router.get('/', async (req, res) => {
    try {
        const weatherSummaries = await WeatherSummary.find().sort({ date: -1 });
        res.json(weatherSummaries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
