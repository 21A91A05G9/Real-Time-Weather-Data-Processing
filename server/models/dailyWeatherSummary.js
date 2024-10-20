import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: Date, required: true },
  avgTemperature: { type: Number, required: true },
  maxTemperature: { type: Number, required: true },
  minTemperature: { type: Number, required: true },
  dominantWeather: { type: String, required: true },
});

const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
