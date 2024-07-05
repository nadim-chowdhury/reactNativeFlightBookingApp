import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, Text, FlatList} from 'react-native';
import {setPriceAlert, getPriceAlerts} from '../services/PriceAlertService';

const PriceAlertScreen = ({route}) => {
  const {userId} = route.params;
  const [routeName, setRouteName] = useState('');
  const [price, setPrice] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');

  const handleSetAlert = async () => {
    try {
      await setPriceAlert(userId, routeName, price);
      setRouteName('');
      setPrice('');
      fetchPriceAlerts();
    } catch (error) {
      setError('Error setting price alert');
    }
  };

  const fetchPriceAlerts = async () => {
    try {
      const alerts = await getPriceAlerts(userId);
      setAlerts(alerts);
    } catch (error) {
      setError('Error fetching price alerts');
    }
  };

  useEffect(() => {
    fetchPriceAlerts();
  }, [userId]);

  return (
    <View>
      <TextInput
        placeholder="Enter Route"
        value={routeName}
        onChangeText={setRouteName}
      />
      <TextInput
        placeholder="Enter Price"
        value={price}
        onChangeText={setPrice}
      />
      <Button title="Set Alert" onPress={handleSetAlert} />
      {error ? <Text>{error}</Text> : null}
      <FlatList
        data={alerts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Text>Route: {item.route}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PriceAlertScreen;
