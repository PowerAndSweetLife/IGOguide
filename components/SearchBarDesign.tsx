import React from 'react';
import {TextInput} from 'react-native';
import {StyleSheet, View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

function SearchBarDesign(): JSX.Element {
  return (
    <View style={styles.searchBarContainer}>
      <Text style={styles.entete}>
        L'application qui vous trouve des loisirs
      </Text>
      {/* <View style={styles.searchBar}>
        <TextInput placeholder="Mot-clé" style={styles.textInput} />
        <TextInput placeholder="Lieu" style={styles.textInput2} />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size={20}
          style={styles.iconReform}
        />
      </View> */}
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
    // marginTop: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    // marginLeft: 1,
    // marginRight: 1,
    textAlign: 'center',
  },
});

export default SearchBarDesign;
