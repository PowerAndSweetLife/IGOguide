import React from 'react';
import {SafeAreaView} from 'react-native';
import Result from '../components/Result';
import {useRoute} from '@react-navigation/native';

function ResultScreen({navigation}): JSX.Element {
  const route = useRoute();
  const {id, sc} = route.params;
  return (
    <SafeAreaView>
      <Result navigation={navigation} id={id} sc={sc} />
    </SafeAreaView>
  );
}

export default ResultScreen;
