import axios from 'axios';

const API_KEY = 'c4ec7e376c8b4418aec50342250207';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getCityForecast = async (city, days = 3) => {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
        params: {
            key: API_KEY,
            q: city,
            days,
        }
    });
    return response.data;
};
