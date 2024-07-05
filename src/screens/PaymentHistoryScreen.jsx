import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {getPaymentHistory} from '../services/BookingService';

const PaymentHistoryScreen = ({route}) => {
  const {userId} = route.params;
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const paymentHistory = await getPaymentHistory(userId);
        setPayments(paymentHistory);
      } catch (error) {
        setError('Error fetching payment history');
      }
    };

    fetchPaymentHistory();
  }, [userId]);

  const renderPaymentItem = ({item}) => (
    <View>
      <Text>Payment ID: {item.id}</Text>
      <Text>Amount: {item.amount}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  return (
    <View>
      {error ? <Text>{error}</Text> : null}
      <FlatList
        data={payments}
        keyExtractor={item => item.id}
        renderItem={renderPaymentItem}
      />
    </View>
  );
};

export default PaymentHistoryScreen;
