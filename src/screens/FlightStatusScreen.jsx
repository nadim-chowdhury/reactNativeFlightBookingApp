import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {getFlightStatus} from '../services/FlightStatusService';

const FlightStatusScreen = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightStatus, setFlightStatus] = useState(null);
  const [error, setError] = useState('');

  const handleCheckStatus = async () => {
    try {
      const status = await getFlightStatus(flightNumber);
      setFlightStatus(status);
    } catch (error) {
      setError('Error fetching flight status');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Flight Number"
        value={flightNumber}
        onChangeText={setFlightNumber}
      />
      <Button title="Check Status" onPress={handleCheckStatus} />
      {error ? <Text>{error}</Text> : null}
      {flightStatus ? (
        <View>
          <Text>Flight Number: {flightStatus.flightNumber}</Text>
          <Text>Status: {flightStatus.status}</Text>
          <Text>Departure Time: {flightStatus.departureTime}</Text>
          <Text>Arrival Time: {flightStatus.arrivalTime}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default FlightStatusScreen;
