const axios = require('axios');
const Kafka = require('kafka-node');
require('dotenv').config();

const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
const producer = new Producer(client);

const weatherTopic = process.env.KAFKA_TOPIC || 'weather_updates';

producer.on('ready', async () => {
    console.log('Kafka Producer is ready');
    fetchWeatherData();
});

producer.on('error', (err) => {
    console.error('Error in Kafka Producer:', err);
});

// Fetch weather data every 5 minutes
const fetchWeatherData = async () => {
    setInterval(async () => {
        try {
            const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
            for (const city of cities) {
                const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`);
                const weatherData = {
                    city: city,
                    main: response.data.weather[0].main,
                    temp: response.data.main.temp - 273.15,  // Kelvin to Celsius
                    feels_like: response.data.main.feels_like - 273.15,
                    dt: response.data.dt
                };
                const messageBuffer = Buffer.from(JSON.stringify(weatherData));

                producer.send([{ topic: weatherTopic, messages: messageBuffer }], (err, data) => {
                    if (err) console.error('Error sending message to Kafka:', err);
                    else console.log('Weather data sent to Kafka:', data);
                });
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }, 300000); // 5 minutes interval
};
