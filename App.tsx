import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Header from './components/Header';
import SearchBarDesign from './components/SearchBarDesign';
import Product from './components/Product';
import Result from './components/Result';
import Detail from './components/Detail';
import Login from './components/Login';
import Accueil from './components/Accueil';
import Register from './components/Register';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';
import ResultScreen from './Screens/ResultScreen';
import DetailScreen from './Screens/DetailScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HamburgerScreen from './Screens/HamburgerScreen';
import Profil from './components/Profil';
import ProfilScreen from './Screens/ProfilScreen';
import FavorisScreen from './Screens/FavorisScreen';
import SearchScreen from './Screens/SearchScreen';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Resultat"
          component={ResultScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Détails"
          component={DetailScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Connexion"
          component={LoginScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Paramètres"
          component={HamburgerScreen}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="Inscription"
          component={RegisterScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Profil"
          component={ProfilScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Favoris"
          component={FavorisScreen}
          options={{headerShown: true,headerTitle: 'Mes favoris'}}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: true,
            headerTitle: 'Résultat de recherche',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    height: 25,
  },
});

export default App;
