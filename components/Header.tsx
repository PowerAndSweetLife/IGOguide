import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, View, Alert, Pressable} from 'react-native';
import IconInsertion from './IconInsertion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
// import IconInsertion from '../utils/IconInsertion';

const showAlert = () => {
  Alert.alert('Custom drawer here', 'Connexion, inscription,...');
};
const showAlertHeart = () => {
  Alert.alert('Page redirection', 'If not connected, login');
};
function Header({navigation}): JSX.Element {
  const goToFavoris = async () => {
    try {
      const user = await AsyncStorage.getItem('id');
      if (user === null) {
        // Go to login
        navigation.navigate('Connexion', {fromScreen: 'header'});
      } else {
        navigation.navigate('Favoris');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goHome = () => {
    navigation.navigate('Home');
  };

  const hambergerShow = () => {
    navigation.navigate('Paramètres');
  };
  return (
    <SafeAreaView>
      <View style={styles.content}>
        <Pressable
          style={styles.iconBar}
          onPress={() => {
            hambergerShow();
          }}>
          <FontAwesomeIcon icon={faBars} style={styles.the_icon} size={25} />
        </Pressable>
        <Pressable
          style={styles.iconLogo}
          onPress={() => {
            goHome();
          }}>
          <IconInsertion imageSource={require('../assets/icons/logo.png')} />
        </Pressable>
        <Pressable
          style={styles.iconFavoris}
          onPress={() => {
            goToFavoris();
          }}>
          <FontAwesomeIcon icon={faHeart} size={24} style={styles.icon_heart} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2b2929',
    padding: 10,
  },
  iconBar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    height: 40,
  },
  iconLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: 40,
  },
  iconFavoris: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    height: 40,
  },
  the_icon: {
    color: 'white',
  },
  icon_heart: {
    color: 'red',
  },
});

export default Header;
