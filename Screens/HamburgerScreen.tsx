import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HamburgerScreen({navigation}): JSX.Element {
  const [sessionID, setSessionID] = useState(false);
  const deconnectUser = async () => {
    await AsyncStorage.removeItem('id');
    await AsyncStorage.removeItem('mail');
    await AsyncStorage.removeItem('photo');
    navigation.navigate('Home');
  };
  const session = async () => {
    const id = await AsyncStorage.getItem('id');

    if (id === null) {
      setSessionID(false);
    } else {
      setSessionID(true);
    }
  };
  session();
  const verifyUser = async () => {
    try {
      const user = await AsyncStorage.getItem('userID');
      if (user === null) {
        navigation.navigate('Connexion', {fromScreen: ''});
      }
    } catch (error) {}
  };
  return (
    <SafeAreaView>
      <View style={styles.centerAll}>
        <View>
          <Pressable
            onPress={() => {
              Linking.openURL('https://igoguide.com/inscription/professionnel');
            }}
            style={styles.menuStyle}>
            <Text>S'inscrire en tant que PRO</Text>
          </Pressable>
        </View>
        {sessionID ? (
          <View>
            <Pressable
              onPress={() => {
                navigation.navigate('Profil');
              }}
              style={styles.menuStyle}>
              <Text>Profil</Text>
            </Pressable>
          </View>
        ) : (
          ''
        )}
        {sessionID ? (
          <View>
            <Pressable
              onPress={() => {
                deconnectUser();
              }}
              style={styles.menuStyle}>
              <Text>Se déconnecter</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Pressable
              onPress={() => {
                verifyUser();
              }}
              style={styles.menuStyle}>
              <Text>Se connecter</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerAll: {
    flexDirection: 'column',
    padding: 20,
  },
  menuStyle: {
    marginTop: 15,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default HamburgerScreen;
