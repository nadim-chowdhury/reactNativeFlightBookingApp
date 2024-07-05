import AsyncStorage from '@react-native-async-storage/async-storage';

const saveBookingDetails = async bookingDetails => {
  try {
    await AsyncStorage.setItem(
      'bookingDetails',
      JSON.stringify(bookingDetails),
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getBookingDetails = async () => {
  try {
    const bookingDetails = await AsyncStorage.getItem('bookingDetails');
    return bookingDetails ? JSON.parse(bookingDetails) : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {saveBookingDetails, getBookingDetails};
