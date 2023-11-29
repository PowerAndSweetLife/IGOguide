import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import Profil from '../components/Profil';

function ProfilScreen({navigation}): JSX.Element {
  return <Profil navigation={navigation} />;
}

export default ProfilScreen;
