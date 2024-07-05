import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {searchFlights} from '../services/FlightService';

const FlightSearchScreen = ({navigation}) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [multiCity, setMultiCity] = useState(false);
  const [secondLegFrom, setSecondLegFrom] = useState('');
  const [secondLegTo, setSecondLegTo] = useState('');
  const [secondLegDate, setSecondLegDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const params = multiCity
        ? {from, to, date, secondLegFrom, secondLegTo, secondLegDate}
        : {from, to, date};
      const results = await searchFlights(params);
      setFlights(results);
    } catch (error) {
      setError('Error fetching flights');
    }
  };

  const renderFlightItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('FlightDetails', {flight: item})}>
      <View>
        <Text>{item.airline}</Text>
        <Text>
          {item.departure_time} - {item.arrival_time}
        </Text>
        <Text>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <TextInput placeholder="From" value={from} onChangeText={setFrom} />
      <TextInput placeholder="To" value={to} onChangeText={setTo} />
      <TextInput placeholder="Date" value={date} onChangeText={setDate} />
      {multiCity && (
        <>
          <TextInput
            placeholder="Second Leg From"
            value={secondLegFrom}
            onChangeText={setSecondLegFrom}
          />
          <TextInput
            placeholder="Second Leg To"
            value={secondLegTo}
            onChangeText={setSecondLegTo}
          />
          <TextInput
            placeholder="Second Leg Date"
            value={secondLegDate}
            onChangeText={setSecondLegDate}
          />
        </>
      )}
      <Button title="Multi-City" onPress={() => setMultiCity(!multiCity)} />
      <Button title="Search Flights" onPress={handleSearch} />
      {error ? <Text>{error}</Text> : null}
      <FlatList
        data={flights}
        keyExtractor={item => item.id}
        renderItem={renderFlightItem}
      />
    </View>
  );
};

export default FlightSearchScreen;

//  import React from 'react';
//    import { View, Text } from 'react-native';
//    import { useTranslation } from 'react-i18next';

//    const FlightSearchScreen = () => {
//      const { t } = useTranslation();

//      return (
//        <View>
//          <Text>{t('welcome')}</Text>
//          <Text>{t('search')}</Text>
//        </View>
//      );
//    };

//    export default FlightSearchScreen;