import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherSummary from './components/weatherSummary.js';

const App = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get('/api/weather');
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div>
            <h1>Real-Time Weather Monitoring System</h1>
            <WeatherSummary data={weatherData} />
        </div>
    );
};

export default App;
