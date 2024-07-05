import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import firebase from '../firebaseConfig';
import GoogleSignInConfig from '../GoogleSignInConfig';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential =
        firebase.auth.GoogleAuthProvider.credential(idToken);
      await firebase.auth().signInWithCredential(googleCredential);
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setError('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Play services not available or outdated');
      } else {
        setError(error.message);
      }
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
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <Button title="Login with Google" onPress={handleGoogleLogin} />
    </View>
  );
};

export default LoginScreen;
