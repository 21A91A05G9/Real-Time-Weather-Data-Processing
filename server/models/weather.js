import mongoose from 'mongoose';

const WeatherSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    avgTemp: Number,
    maxTemp: Number,
    minTemp: Number,
    dominantCondition: String,
});

module.exports = mongoose.model('Weather', WeatherSchema);
