import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CategorieImage from './CategorieImage';

function Product({navigation}): JSX.Element {
  return (
    <ScrollView>
      <Text style={styles.entete}>
        Faites vos recherches avec les catégories suivantes
      </Text>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Resultat', {id: 1})}>
          <View style={styles.contentCategorie}>
            <CategorieImage
              imageSource={require('../assets/icons/hebergement_bleu.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Resultat', {id: 2})}>
          <View style={styles.contentCategorie}>
            <CategorieImage
              imageSource={require('../assets/icons/ou_boire_bleu.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Resultat', {id: 3})}>
          <View style={styles.contentCategorie}>
            <CategorieImage
              imageSource={require('../assets/icons/hebergement_bleu.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Resultat', {id: 4})}>
          <View style={styles.contentCategorie}>
            <CategorieImage
              imageSource={require('../assets/icons/balades_bleu.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Resultat', {id: 5})}>
          <View style={styles.contentCategorie}>
            <CategorieImage
              imageSource={require('../assets/icons/activites_bleu.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Resultat', {id: 6})}>
          <View style={styles.contentCategorie}>
            <CategorieImage
              imageSource={require('../assets/icons/services_bleu.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  content: {
    paddingTop: 5,
    paddingBottom: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentCategorie: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    borderRadius: 10,
    padding: 41,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dddddd',
    borderWidth: 1,
  },
  entete: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
    // marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },
});

export default Product;
