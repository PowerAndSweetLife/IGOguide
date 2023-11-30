import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Header from './Header';

function Categorie({navigation, id}): JSX.Element {
  const [nomCateg, setNomCateg] = useState('');
  useEffect(() => {
    switch (id) {
      case 1:
        setNomCateg('Hébergements');
        break;
      case 2:
        setNomCateg('Bar');
        break;
      case 3:
        setNomCateg('Restaurant');
        break;
      case 4:
        setNomCateg('Balades');
        break;
      case 5:
        setNomCateg('Activités');
        break;
      case 6:
        setNomCateg('Services');
        break;
    }
  });
  return <Text style={styles.txt}>Catégorie: {nomCateg}</Text>;
}

const styles = StyleSheet.create({
  txt: {
    padding: 25,
    // height: 50,
    fontSize: 20,
  },
});

export default Categorie;
