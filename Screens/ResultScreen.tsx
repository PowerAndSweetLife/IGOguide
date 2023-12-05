import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from '../components/Header';
import SearchBarDesign from '../components/SearchBarDesign';
import Result from '../components/Result';
import {useRoute} from '@react-navigation/native';
import Categorie from '../components/Categorie';

function ResultScreen({navigation}): JSX.Element {
  const route = useRoute();
  const {id, sc} = route.params;
  return (
    <SafeAreaView>
      {/* <Header navigation={navigation} /> */}
      {/* <SearchBarDesign /> */}
      {/* <Categorie navigation={navigation} id={id} /> */}
      <Result navigation={navigation} id={id} sc={sc} />
      {/* <Product /> */}
      {/* <Result/> */}
      {/* <Detail /> */}
      {/* <Login/> */}
      {/* <Register/> */}
    </SafeAreaView>
  );
}

export default ResultScreen;
