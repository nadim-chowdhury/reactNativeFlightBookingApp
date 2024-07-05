import axios from 'axios';

const API_BASE_URL = 'https://api.flightstatus.com'; // Replace with actual API URL

const getFlightStatus = async flightNumber => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/flights/${flightNumber}/status`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {getFlightStatus};
