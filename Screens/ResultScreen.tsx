import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from '../components/Header';
import SearchBarDesign from '../components/SearchBarDesign';
import Result from '../components/Result';
import {useRoute} from '@react-navigation/native';

function ResultScreen({navigation}): JSX.Element {
  const route = useRoute();
  const {id} = route.params;
  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <SearchBarDesign />
      <Result navigation={navigation} id={id} />
      {/* <Product /> */}
      {/* <Result/> */}
      {/* <Detail /> */}
      {/* <Login/> */}
      {/* <Register/> */}
    </SafeAreaView>
  );
}

export default ResultScreen;
