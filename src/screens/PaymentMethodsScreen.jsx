import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {savePaymentMethod} from '../services/UserService';

const PaymentMethodsScreen = ({route}) => {
  const {userId} = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handleSavePaymentMethod = async () => {
    try {
      const paymentMethod = {cardNumber, expiryDate, cvv};
      await savePaymentMethod(userId, paymentMethod);
    } catch (error) {
      setError('Error saving payment method');
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
      <Button title="Save Payment Method" onPress={handleSavePaymentMethod} />
    </View>
  );
};

export default PaymentMethodsScreen;
