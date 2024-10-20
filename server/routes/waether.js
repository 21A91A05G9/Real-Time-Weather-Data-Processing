const express = require('express');
const WeatherSummary = require('../models/WeatherSummary');

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

module.exports = router;
