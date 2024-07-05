import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { selectSeats, addAddons } from '../services/BookingService';

const BookingScreen = ({ route, navigation }) => {
  const { bookingId } = route.params;
  const [seats, setSeats] = useState([]);
  const [addons, setAddons] = useState([]);
  const [error, setError] = useState('');

  const handleSeatSelection = async (selectedSeats) => {
    try {
      const response = await selectSeats(bookingId, selectedSeats);
      setSeats(response.seats);
    } catch (error) {
      setError('Error selecting seats');
    }
  };

  const handleAddonsSelection = async (selectedAddons) => {
    try {
      const response = await addAddons(bookingId, selectedAddons);
      setAddons(response.addons);
    } catch (error) {
      setError('Error adding addons');
    }
  };

  const renderSeatItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSeatSelection([item])}>
      <View>
        <Text>{item.seatNumber}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderAddonItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleAddonsSelection([item])}>
      <View>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Select Seats</Text>
      <FlatList
        data={/* Fetch seat data */}
        keyExtractor={(item) => item.id}
        renderItem={renderSeatItem}
      />
      <Text>Select Add-ons</Text>
      <FlatList
        data={/* Fetch addons data */}
        keyExtractor={(item) => item.id}
        renderItem={renderAddonItem}
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Proceed to Payment" onPress={() => navigation.navigate('Payment', { bookingId })} />
    </View>
  );
};

export default BookingScreen;