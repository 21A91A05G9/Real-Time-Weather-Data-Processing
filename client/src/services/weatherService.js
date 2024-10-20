import axios from 'axios';

const API_URL = 'http://localhost:5000/api/weather';

export const updateWeather = async () => {
    const response = await axios.get(`${API_URL}/update`);
    return response.data;
};
