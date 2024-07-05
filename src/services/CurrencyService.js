import axios from 'axios';

const API_BASE_URL = 'https://api.currencyapi.com'; // Replace with actual API URL

const getExchangeRate = async (baseCurrency, targetCurrency) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/latest`, {
      params: {
        base: baseCurrency,
        symbols: targetCurrency,
      },
    });
    return response.data.rates[targetCurrency];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {getExchangeRate};
