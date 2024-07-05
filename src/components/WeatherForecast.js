import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {getWeather} from '../services/WeatherService';

const WeatherForecast = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleGetWeather = async () => {
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      setError('Error fetching weather data');
    }
  };

  return (
    <View>
      <TextInput placeholder="Enter City" value={city} onChangeText={setCity} />
      <Button title="Get Weather" onPress={handleGetWeather} />
      {error ? <Text>{error}</Text> : null}
      {weather ? (
        <View>
          <Text>Temperature: {weather.current.temp_c}°C</Text>
          <Text>Condition: {weather.current.condition.text}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default WeatherForecast;
