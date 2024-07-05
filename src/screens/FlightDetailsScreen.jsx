import React from 'react';
import {View, Text} from 'react-native';

const FlightDetailsScreen = ({route}) => {
  const {flight} = route.params;

  return (
    <View>
      <Text>Airline: {flight.airline}</Text>
      <Text>Departure Time: {flight.departure_time}</Text>
      <Text>Arrival Time: {flight.arrival_time}</Text>
      <Text>Duration: {flight.duration}</Text>
      <Text>Price: {flight.price}</Text>
      <Text>Stops: {flight.stops}</Text>
      <Text>Baggage Policy: {flight.baggage_policy}</Text>
    </View>
  );
};

export default FlightDetailsScreen;
