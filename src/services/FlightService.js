import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL

const searchFlights = async params => {
  try {
    const response = await axios.get(`${API_BASE_URL}/flights/search`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {searchFlights};
