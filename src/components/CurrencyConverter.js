import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Picker, Button} from 'react-native';
import {getExchangeRate} from '../services/CurrencyService';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [error, setError] = useState('');

  const handleConvert = async () => {
    try {
      const rate = await getExchangeRate(baseCurrency, targetCurrency);
      setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
    } catch (error) {
      setError('Error fetching exchange rate');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Picker selectedValue={baseCurrency} onValueChange={setBaseCurrency}>
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
        {/* Add more currencies */}
      </Picker>
      <Picker selectedValue={targetCurrency} onValueChange={setTargetCurrency}>
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="USD" value="USD" />
        {/* Add more currencies */}
      </Picker>
      <Button title="Convert" onPress={handleConvert} />
      {error ? <Text>{error}</Text> : null}
      {convertedAmount ? (
        <Text>Converted Amount: {convertedAmount}</Text>
      ) : null}
    </View>
  );
};

export default CurrencyConverter;
