import React from 'react';
import {SafeAreaView} from 'react-native';
import Register from '../components/Register';

function RegisterScreen({navigation}): JSX.Element {
  return (
    <SafeAreaView>
      <Register navigation={navigation} />
    </SafeAreaView>
  );
}

export default RegisterScreen;
