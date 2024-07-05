import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL

const getUserProfile = async userId => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}`,
      profileData,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const savePaymentMethod = async (userId, paymentMethod) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/${userId}/payment-methods`,
      paymentMethod,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getBookingHistory = async userId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/bookings`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const savePreferences = async (userId, preferences) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/${userId}/preferences`,
      preferences,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  getUserProfile,
  updateUserProfile,
  savePaymentMethod,
  getBookingHistory,
  savePreferences,
};
