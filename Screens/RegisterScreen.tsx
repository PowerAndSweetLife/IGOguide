import React from 'react';
import {SafeAreaView} from 'react-native';
import Register from '../components/Register';

function RegisterScreen({navigation}): JSX.Element {
  return (
    <SafeAreaView>
      <Register navigation={navigation} />
      {/* <Login navigation={navigation} /> */}
      {/* <Header /> */}
      {/* <SearchBarDesign /> */}
      {/* <Product navigation={navigation}/> */}
      {/* <Result/> */}
      {/* <Detail /> */}
      {/* <Login/> */}
      {/* <Register/> */}
    </SafeAreaView>
  );
}

export default RegisterScreen;
