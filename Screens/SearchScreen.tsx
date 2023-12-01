import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from '../components/Header';
import SearchBarDesign from '../components/SearchBarDesign';
import Result from '../components/Result';
import {useRoute} from '@react-navigation/native';
import ResultSearchBar from '../components/ResultSearchBar';

function SearchScreen({navigation}): JSX.Element {
  const route = useRoute();
  return (
    <SafeAreaView>
      {/* <Header navigation={navigation} /> */}
      {/* <SearchBarDesign navigation={navigation} /> */}
      <ResultSearchBar navigation={navigation} />
      {/* <Product /> */}
      {/* <Result/> */}
      {/* <Detail /> */}
      {/* <Login/> */}
      {/* <Register/> */}
    </SafeAreaView>
  );
}

export default SearchScreen;
