import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from '../components/Header';
import SearchBarDesign from '../components/SearchBarDesign';
import Product from '../components/Product';

function HomeScreen({navigation}): JSX.Element {
  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <SearchBarDesign />
      <Product navigation={navigation}/>
      {/* <Result/> */}
      {/* <Detail /> */}
      {/* <Login/> */}
      {/* <Register/> */}
    </SafeAreaView>
  );
}

export default HomeScreen;
