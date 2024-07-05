import axios from 'axios';

const API_BASE_URL = 'https://api.pricealerts.com'; // Replace with actual API URL

const setPriceAlert = async (userId, route, price) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/${userId}/price-alerts`,
      {route, price},
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPriceAlerts = async userId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/price-alerts`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {setPriceAlert, getPriceAlerts};
