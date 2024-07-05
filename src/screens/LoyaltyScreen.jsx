import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  getLoyaltyPoints,
  getFrequentFlyerPrograms,
} from '../services/LoyaltyService';

const LoyaltyScreen = ({route}) => {
  const {userId} = route.params;
  const [loyaltyPoints, setLoyaltyPoints] = useState(null);
  const [frequentFlyerPrograms, setFrequentFlyerPrograms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoyaltyData = async () => {
      try {
        const points = await getLoyaltyPoints(userId);
        setLoyaltyPoints(points);

        const programs = await getFrequentFlyerPrograms(userId);
        setFrequentFlyerPrograms(programs);
      } catch (error) {
        setError('Error fetching loyalty data');
      }
    };

    fetchLoyaltyData();
  }, [userId]);

  return (
    <View>
      {error ? <Text>{error}</Text> : null}
      {loyaltyPoints !== null && (
        <View>
          <Text>Loyalty Points: {loyaltyPoints.points}</Text>
        </View>
      )}
      <View>
        <Text>Frequent Flyer Programs:</Text>
        {frequentFlyerPrograms.map(program => (
          <View key={program.id}>
            <Text>
              {program.name}: {program.points} points
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default LoyaltyScreen;
