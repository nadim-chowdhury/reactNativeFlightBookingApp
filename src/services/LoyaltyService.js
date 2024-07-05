import axios from 'axios';

const API_BASE_URL = 'https://api.loyaltyprogram.com'; // Replace with actual API URL

const getLoyaltyPoints = async userId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/loyalty-points`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFrequentFlyerPrograms = async userId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/frequent-flyer-programs`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {getLoyaltyPoints, getFrequentFlyerPrograms};
