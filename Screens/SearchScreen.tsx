import React from 'react';
import {SafeAreaView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import ResultSearchBar from '../components/ResultSearchBar';

function SearchScreen({navigation}): JSX.Element {
  const route = useRoute();
  return (
    <SafeAreaView>
      <ResultSearchBar navigation={navigation} />
    </SafeAreaView>
  );
}

export default SearchScreen;
