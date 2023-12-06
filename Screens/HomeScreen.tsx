import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from '../components/Header';
import SearchBarDesign from '../components/SearchBarDesign';
import Product from '../components/Product';

function HomeScreen({navigation}): JSX.Element {
  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <SearchBarDesign navigation={navigation} />
      <Product navigation={navigation}/>
    </SafeAreaView>
  );
}

export default HomeScreen;
