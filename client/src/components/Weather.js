import React, { useEffect, useState } from 'react';
import { updateWeather } from '../services/weatherService';

const Weather = () => {
    const [weatherData, setWeatherData] = useState([]);

    const fetchWeatherData = async () => {
        const data = await updateWeather();
        setWeatherData(data);
    };

    useEffect(() => {
        fetchWeatherData();
        const interval = setInterval(fetchWeatherData, 5 * 60 * 1000); // Refresh every 5 minutes
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Weather Monitoring</h2>
            {weatherData.map((data) => (
                <div key={data.date}>
                    <p>Date: {data.date}</p>
                    <p>Average Temp: {data.avgTemp}°C</p>
                    <p>Max Temp: {data.maxTemp}°C</p>
                    <p>Min Temp: {data.minTemp}°C</p>
                    <p>Dominant Condition: {data.dominantCondition}</p>
                </div>
            ))}
        </div>
    );
};

export default Weather;
