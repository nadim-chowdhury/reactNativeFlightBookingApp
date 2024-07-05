import axios from 'axios';

const API_BASE_URL = 'https://api.reviews.com'; // Replace with actual API URL

const submitReview = async (userId, airlineId, rating, comment) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reviews`, {
      userId,
      airlineId,
      rating,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getReviews = async airlineId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/airlines/${airlineId}/reviews`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {submitReview, getReviews};
