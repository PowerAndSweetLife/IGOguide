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

function Register({navigation}): JSX.Element {
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [new_mdp, setNew_mdp] = useState('');
  const do_connect = () => {
    navigation.navigate('Connexion');
  };
  const register = async () => {
    if (
      name !== '' &&
      prenom !== '' &&
      email !== '' &&
      mdp !== '' &&
      new_mdp !== ''
    ) {
      if (mdp !== new_mdp) {
        Alert.alert('Attention', 'Les mots de passes ne sont pas identiques');
      } else {
        try {
          const res = await fetch(BASE_URL + 'register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nom: name,
              prenom: prenom,
              email: email,
              mdp: mdp,
            }),
          });
          if (res.ok) {
            const resultText = await res.text();
            const result = JSON.parse(resultText);
            if (result.success) {
              // Alert.alert('Succes', 'Enregistrement avec succès !');
              navigation.navigate('Home');
            } else {
              Alert.alert(
                'Attention',
                "Il y a une erreur lors de l'enregistrement !",
              );
            }
          } else {
            Alert.alert('Erreur !', 'Ré-essayer plus tard');
          }
        } catch (error) {
          Alert.alert('Erreur !', 'Erreur de connexion au serveur !');
        }
      }
    } else {
      Alert.alert('Attention', 'Certains champs sont obligatoires');
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container_form}>
        <TextInput
          style={styles.inputReform}
          placeholder="Nom"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.inputReform}
          placeholder="Prénom"
          value={prenom}
          onChangeText={text => setPrenom(text)}
        />
        <TextInput
          style={styles.inputReform}
          placeholder="E-mail"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.inputReform}
          placeholder="Mot de passe"
          value={mdp}
          onChangeText={text => setMdp(text)}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.inputReform}
          placeholder="Confirmer mot de passe"
          value={new_mdp}
          onChangeText={text => setNew_mdp(text)}
        />
        <Text
          onPress={() => {
            do_connect();
          }}
          style={styles.se_connecter}>
          Se connecter
        </Text>
        <Button
          title="S'inscrire"
          onPress={() => {
            register();
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
  se_connecter: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    color: '#fec20b',
  },
});

export default Register;
