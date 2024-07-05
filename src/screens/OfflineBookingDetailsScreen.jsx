import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {getBookingDetails} from '../services/OfflineService';

const OfflineBookingDetailsScreen = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const details = await getBookingDetails();
        setBookingDetails(details);
      } catch (error) {
        setError('Error fetching booking details');
      }
    };

    fetchBookingDetails();
  }, []);

  return (
    <View>
      {error ? <Text>{error}</Text> : null}
      {bookingDetails ? (
        <View>
          <Text>Flight: {bookingDetails.flight}</Text>
          <Text>Date: {bookingDetails.date}</Text>
          {/* Add more booking details */}
        </View>
      ) : (
        <Text>No booking details available</Text>
      )}
    </View>
  );
};

export default OfflineBookingDetailsScreen;
