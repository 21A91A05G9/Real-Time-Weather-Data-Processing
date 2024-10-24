# Real-Time-Weather-Data-Processing

## Project Overview
The Real-Time Data Processing System for Weather Monitoring is designed to continuously retrieve and analyze weather data from the OpenWeatherMap API, providing summarized insights through rollups and aggregates. The system monitors various weather parameters, including temperature and main weather conditions, to deliver timely alerts and visualizations.

## Objectives
  - Develop a real-time data processing system that fetches weather conditions from the OpenWeatherMap API.
  - Summarize and analyze the data using rollups and aggregates to provide meaningful insights.
  - Implement alerting mechanisms for significant weather changes.

## Features
- Real-Time Data Retrieval: Continuously fetch weather data from the OpenWeatherMap API at configurable intervals (e.g., every 5 minutes).
- Temperature Conversion: Convert temperature values from Kelvin to Celsius or Fahrenheit based on user preference.
- Daily Weather Summary: Roll up weather data for each day and calculate:
    - Average temperature
    - Maximum temperature
    - Minimum temperature
    - Dominant weather condition (reasoning provided)
- Alerting System: User-configurable thresholds for temperature and weather conditions. Trigger alerts when thresholds are breached.
- Data Visualization: Display daily weather summaries, historical trends, and alerts through graphical representations.

## Data Source
The system utilizes the OpenWeatherMap API, which provides various weather parameters. A free API key is required to access the data.

## Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB

## Project Structure
      Rule-Engine-With-AST/
      ├── server/                   # Backend code
      │   ├── config/               # Configuration
      │   ├── controllers/          # API controllers
      │   ├── models/               # Database models
      │   ├── routes/               # API routes
      │   ├── .env                  # Environment variables
      │   ├── package.json          # Backend dependencies
      │   └── App.js                # Backend entry point
      ├── client/                   # Frontend code
      │   ├── public/               # Public assets
      │   ├── src/                  # React components and logic
      │   ├── package.json          # Frontend dependencies
      │   └── .env                  # Frontend environment variables
      └── README.md                 # Project documentation
   


## How to Start

### Frontend Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/21A91A05G9/Real-Time-Weather-Data-Processing.git
   cd Rule-Engine-With-AST

2. **Navigate to the Frontend Directory**
   ```bash
   npm install

3. **Install Dependencie**
   ```bash
   cd client

3. **Start the Frontend Application**
   ```bash
   npm start

### Backend Setup
1. **Navigate to the Backend Directory**
   ```bash
   cd ../server

2. **Install Dependencies**
   ```bash
   npm install

4. **Set Up Environment Variables Create a .env file in the backend directory with the following content:**
    ```bash
    OPENWEATHER_API_KEY=your_api_key
    MONGODB_URI=mongodb://localhost:27017/rule_engine
    PORT=5000


5. **Start the Backend Application**
   ```bash
   npm start


## How to Use
- Real-Time Monitoring: The system will continuously fetch weather data for specified metros in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).
- Daily Summaries: Review daily weather summaries, including average, maximum, and minimum temperatures, along with the dominant weather condition.
- Alerts: Configure thresholds for temperature or specific weather conditions. Alerts will trigger based on the defined criteria.

## API Endpoints
1. Fetch weather forecast
- Endpoint: GET /api/weather?city=${city}&units=${unit}
- Description: Fetching data from the openweathermap.org
- Request Body
  ```bash
  {
  "city" : Hyderabad,
  "unit" : metric
  }
- Response
  ```bash
  {
  "city":"Hyderabad",
  "avgTemperature":28.23,
  "maxTemperature":28.23,
  "minTemperature":23.73,
  "dominantWeather":"light rain",
  "humidity":74,
  "windSpeed":3.6,"
  date":1729593790000
  }
![image](https://github.com/user-attachments/assets/17247350-372d-4cb1-8baa-8f132ed4305e)


## Bonus Features
- Extended Weather Parameters: Support additional parameters from the OpenWeatherMap API (e.g., humidity, wind speed) in rollups and aggregates.
- Weather Forecasts: Retrieve and summarize weather forecasts based on predicted conditions.

## Running Tests
You can implement and execute tests to verify that everything is functioning as expected.

