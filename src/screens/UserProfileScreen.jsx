import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {
  getUserProfile,
  updateUserProfile,
  savePreferences,
} from '../services/UserService';

const UserProfileScreen = ({route}) => {
  const {userId} = route.params;
  const [profile, setProfile] = useState({});
  const [preferences, setPreferences] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(userId);
        setProfile(userProfile);
      } catch (error) {
        setError('Error fetching profile');
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile(userId, profile);
    } catch (error) {
      setError('Error updating profile');
    }
  };

  const handleSavePreferences = async () => {
    try {
      await savePreferences(userId, preferences);
    } catch (error) {
      setError('Error saving preferences');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={profile.name || ''}
        onChangeText={text => setProfile({...profile, name: text})}
      />
      <TextInput
        placeholder="Email"
        value={profile.email || ''}
        onChangeText={text => setProfile({...profile, email: text})}
      />
      <TextInput
        placeholder="Preferred Airlines"
        value={preferences.preferredAirlines || ''}
        onChangeText={text =>
          setPreferences({...preferences, preferredAirlines: text})
        }
      />
      <TextInput
        placeholder="Seating Preferences"
        value={preferences.seatingPreferences || ''}
        onChangeText={text =>
          setPreferences({...preferences, seatingPreferences: text})
        }
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Update Profile" onPress={handleUpdateProfile} />
      <Button title="Save Preferences" onPress={handleSavePreferences} />
    </View>
  );
};

export default UserProfileScreen;
