import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {Alert, StyleSheet, View, Text, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {BASE_URL} from '../helper/URL';

function SearchBarDesignSpecific({navigation, id}): JSX.Element {
  const [motCle, setMotCle] = useState('');
  const [lieu, setLieu] = useState('');
  const doSearch = async () => {
    if (motCle === '' && lieu === '') {
      Alert.alert('Attention !', 'Remplir au moins un critère');
    } else {
      try {
        navigation.navigate('Resultat', {mc: motCle, loc: lieu, id: id});
      } catch (error) {}
    }
  };
  return (
    <View style={styles.searchBarContainer}>
      <Text style={styles.entete}>
        L'application qui vous trouve des loisirs
      </Text>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Mot-clé"
          onChangeText={text => setMotCle(text)}
          style={styles.textInput}
          value={motCle}
        />
        <TextInput
          onChangeText={text => setLieu(text)}
          placeholder="Lieu"
          style={styles.textInput2}
          value={lieu}
        />
        <Pressable
          onPress={() => {
            doSearch();
          }}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size={20}
            style={styles.iconReform}
          />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 10,
  },
  textInput: {
    width: '45%',
    padding: 1,
    borderRightColor: '#dddddd',
    borderRightWidth: 1,
  },
  textInput2: {
    marginLeft: 5,
    width: '40%',
    padding: 2,
    borderColor: 'white',
  },
  searchBarContainer: {
    margin: 22,
  },
  iconReform: {
    marginLeft: 5,
    color: '#ffc107',
    fontWeight: 'bold',
  },
  entete: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default SearchBarDesignSpecific;
