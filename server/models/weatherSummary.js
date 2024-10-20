import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
    city: String,
    main: String,
    temp: Number,
    feels_like: Number,
    date: { type: Date, default: Date.now }
});

export default mongoose.model('WeatherSummary', weatherSchema);