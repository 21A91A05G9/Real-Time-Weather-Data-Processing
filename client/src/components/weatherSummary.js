import React from 'react';

const WeatherSummary = ({ data }) => {
    return (
        <div>
            <h2>Weather Summaries</h2>
            {data.map((item, index) => (
                <div key={index}>
                    <h3>{item.city}</h3>
                    <p>Main: {item.main}</p>
                    <p>Temperature: {item.temp.toFixed(2)} °C</p>
                    <p>Feels Like: {item.feels_like.toFixed(2)} °C</p>
                    <p>Date: {new Date(item.date).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default WeatherSummary;
