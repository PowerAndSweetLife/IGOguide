import React from 'react';
import {SafeAreaView} from 'react-native';
import Login from '../components/Login';

function LoginScreen({navigation}): JSX.Element {
  return (
    <SafeAreaView>
      <Login navigation={navigation} />
    </SafeAreaView>
  );
}

export default LoginScreen;
