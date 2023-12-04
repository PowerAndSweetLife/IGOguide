import React from 'react';
import {StyleSheet, Text} from 'react-native';
import SousCategories from '../components/SousCategories';
import {useRoute} from '@react-navigation/native';

function SousCategoriesScreen({navigation}): JSX.Element {
  const route = useRoute();
  const {id} = route.params;
  return <SousCategories navigation={navigation} id={id} />;
}

export default SousCategoriesScreen;
