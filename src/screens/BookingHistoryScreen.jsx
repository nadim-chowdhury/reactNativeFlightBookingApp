import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {getBookingHistory} from '../services/UserService';

const BookingHistoryScreen = ({route}) => {
  const {userId} = route.params;
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const bookingHistory = await getBookingHistory(userId);
        setBookings(bookingHistory);
      } catch (error) {
        setError('Error fetching booking history');
      }
    };

    fetchBookingHistory();
  }, [userId]);

  const renderBookingItem = ({item}) => (
    <View>
      <Text>Booking ID: {item.id}</Text>
      <Text>Flight: {item.flightNumber}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Amount: {item.amount}</Text>
    </View>
  );

  return (
    <View>
      {error ? <Text>{error}</Text> : null}
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={renderBookingItem}
      />
    </View>
  );
};

export default BookingHistoryScreen;
