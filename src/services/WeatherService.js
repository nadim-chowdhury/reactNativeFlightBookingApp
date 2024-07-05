import axios from 'axios';

const API_BASE_URL = 'https://api.weatherapi.com'; // Replace with actual API URL

const getWeather = async city => {
  try {
    const response = await axios.get(`${API_BASE_URL}/current.json`, {
      params: {
        key: 'YOUR_API_KEY',
        q: city,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {getWeather};
