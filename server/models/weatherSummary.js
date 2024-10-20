const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: String,
    main: String,
    temp: Number,
    feels_like: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeatherSummary', weatherSchema);
