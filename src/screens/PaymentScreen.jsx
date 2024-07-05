import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {makePayment} from '../services/BookingService';

const PaymentScreen = ({route, navigation}) => {
  const {bookingId} = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handlePayment = async () => {
    try {
      const paymentDetails = {cardNumber, expiryDate, cvv};
      await makePayment(bookingId, paymentDetails);
      navigation.navigate('PaymentHistory');
    } catch (error) {
      setError('Error processing payment');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        placeholder="Expiry Date"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />
      <TextInput
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        secureTextEntry
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Make Payment" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;
