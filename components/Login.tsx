import React, {useState} from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {BASE_URL} from '../helper/URL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';

function Login({navigation}): JSX.Element {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const route = useRoute();
  const {fromScreen, idresult} = route.params;
  const suscribe = () => {
    navigation.navigate('Inscription');
  };
  const connect = async () => {
    if (email === '' && mdp === '') {
      Alert.alert('Attention', 'Certains champs sont obligatoires');
    } else {
      try {
        const res = await fetch(BASE_URL + 'connectUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            mdp: mdp,
          }),
        });
        if (res.ok) {
          const resultText = await res.text();
          const result = JSON.parse(resultText);

          // console.log(result);

          if (result.success) {
            // console.log("nety oh") ;
            await AsyncStorage.setItem('id', result.data[0].users_id);
            await AsyncStorage.setItem('mail', result.data[0].users_email);
            await AsyncStorage.setItem('photo', result.data[0].users_photo);
            const id = await AsyncStorage.getItem('id');
            if (fromScreen === 'favorite') {
              navigation.navigate('Détails', {id: idresult});
            } else {
              navigation.navigate('Home');
            }

            // await AsyncStorage.setItem('userToken', token);
          } else {
            // navigation.navigate('Inscription') ;
            const id = await AsyncStorage.getItem('id');
            console.log('Eto oh: ' + fromScreen);
            if (id !== null) {
              if (fromScreen === 'favorite') {
                navigation.navigate('Détails', {id: idresult});
              } else {
                navigation.navigate('Home');
              }
            } else {
              Alert.alert('Erreur !', 'E-mail ou mot de passe incorrect');
            }
          }
        } else {
          const id = await AsyncStorage.getItem('id');
          if (id !== null) {
            console.log('Eto oh: ' + fromScreen);
            if (fromScreen === 'favorite') {
              navigation.navigate('Détails', {id: idresult});
            } else {
              navigation.navigate('Home');
            }
          } else {
            Alert.alert('Erreur !', 'Re-essayer plus tard');
          }
        }
      } catch (error) {
        const id = await AsyncStorage.getItem('id');
        if (id !== null) {
          console.log('Eto oh: ' + fromScreen);
          if (fromScreen === 'favorite') {
            navigation.navigate('Détails', {id: idresult});
          } else {
            navigation.navigate('Home');
          }
        }
        // Alert.alert('Erreur !', 'Erreur de connexion au serveur !');
      }
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container_form}>
        <TextInput
          style={styles.inputReform}
          value={email}
          placeholder="E-mail"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          onChangeText={text => setMdp(text)}
          value={mdp}
          secureTextEntry={true}
          style={styles.inputReform}
          placeholder="Mot de passe"
        />
        <Text
          onPress={() => {
            suscribe();
          }}
          style={styles.s_inscrire}>
          S'inscrire
        </Text>
        <Button
          title="Se connecter"
          onPress={() => {
            connect();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container_form: {
    padding: 25,
  },
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inputReform: {
    borderWidth: 1,
    borderColor: '#dddddd',
    marginBottom: 5,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  s_inscrire: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    color: '#fec20b',
  },
});

export default Login;
