import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Header from './Header';

function Accueil({navigation}): JSX.Element {
  return (
    <SafeAreaView>
      <Text>Salut</Text>
      {/* <Header /> */}
      {/* <SearchBarDesign /> */}
      {/* <Product /> */}
      {/* <Result /> */}
      {/* <Detail /> */}
      {/* <Login/> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    height: 25,
  },
});

export default Accueil;
