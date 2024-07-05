import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import firebase from '../firebaseConfig';

const PasswordRecoveryScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setMessage('Password reset email sent!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Button title="Reset Password" onPress={handlePasswordReset} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

export default PasswordRecoveryScreen;
