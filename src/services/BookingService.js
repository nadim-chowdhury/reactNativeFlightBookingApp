import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL

const selectSeats = async (bookingId, seats) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/bookings/${bookingId}/seats`,
      {seats},
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addAddons = async (bookingId, addons) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/bookings/${bookingId}/addons`,
      {addons},
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const makePayment = async (bookingId, paymentDetails) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/bookings/${bookingId}/payment`,
      {paymentDetails},
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPaymentHistory = async userId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/payments`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {selectSeats, addAddons, makePayment, getPaymentHistory};
