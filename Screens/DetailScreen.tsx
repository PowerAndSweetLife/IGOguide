import React from 'react';
import {SafeAreaView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Detail from '../components/Detail';

function DetailScreen({navigation}): JSX.Element {
  const route = useRoute();
  const {id} = route.params;
  return (
    <SafeAreaView>
      {/* <Header />
      <SearchBarDesign /> */}
      <Detail navigation={navigation} id={id} />
      {/* <Product /> */}
      {/* <Result/> */}
      {/* <Detail /> */}
      {/* <Login/> */}
      {/* <Register/> */}
    </SafeAreaView>
  );
}

export default DetailScreen;
