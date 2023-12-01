import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CategorieImage from './CategorieImage';
import {BASE_URL, ONLINE_URL} from '../helper/URL';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
const maxHeight = Dimensions.get('window').height - 415;
function Product({navigation}): JSX.Element {
  const [tab, setTab] = useState([]);
  const [loadOrNot, setLoadOrNot] = useState(true);
  const getHome = async () => {
    try {
      const res = await fetch(BASE_URL + 'alldatas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: '123',
        }),
      });
      // if (res.ok) {
      // console.log(res);
      const resultText = await res.text();
      const data = JSON.parse(resultText);
      setTab(data.data);
      setLoadOrNot(false);
      console.log(data.data);
      // } else {
      //   console.log('not ok');
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHome();
  }, []);

  return (
    <View>
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
              imageSource={require('../assets/icons/restaurant_blue.png')}
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
      <ScrollView style={styles.container_scroll}>
        {loadOrNot ? (
          <View style={styles.activity}>
            <ActivityIndicator color="#52b7c6" />
          </View>
        ) : (
          tab.map((elem, index) => (
            <TouchableOpacity
              key={index}
              style={styles.touchableProperty}
              onPress={() =>
                navigation.navigate('Détails', {id: elem.etablissements_id})
              }>
              <View style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    // source={require('../assets/images/img2.jpg')}
                    source={{
                      uri:
                        ONLINE_URL +
                        'publics/' +
                        JSON.parse(elem.etablissements_photo)[0],
                    }}
                    style={styles.imageToShow}
                  />
                  {/* <View style={styles.place_for_heart}>
                  <FontAwesomeIcon icon={faHeart} style={styles.icon_heart} />
                </View> */}
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.nom_fiche}>
                    {elem.etablissements_nom}
                  </Text>
                  <Text style={styles.location}>
                    <FontAwesomeIcon
                      icon={faLocationPin}
                      size={10}
                      style={styles.icon_replacement}
                    />
                    <Text style={styles.location_text}>
                      {elem.etablissements_adresse}
                    </Text>
                  </Text>
                  <View style={styles.place_for_owner}>
                    <Image
                      source={
                        elem.users_etablissement_logo == ''
                          ? {
                              uri:
                                ONLINE_URL +
                                'publics/' +
                                elem.users_etablissement_logo,
                            }
                          : require('../assets/images/avatar.png')
                      }
                      style={styles.image_owner}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.sous_categorie}>
                <View style={styles.imageContainer_sc}>
                  <Image
                    source={{
                      uri:
                        ONLINE_URL +
                        'publics/image/icon-sous-categories/' +
                        elem.sous_categories_icon,
                    }}
                    style={styles.sous_categorie_image}
                  />
                </View>
                <Text style={styles.sous_categorie_text}>
                  {elem.sous_categories_nom}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
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
  container_scroll: {
    maxHeight: maxHeight,
    // backgroundColor: 'red',
    paddingLeft: 25,
    paddingRight: 25,
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
  container: {
    paddingLeft: 25,
    paddingRight: 25,
    maxHeight: maxHeight,
  },
  cardContainer: {
    flexDirection: 'column',
    height: 250,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 0,
  },
  place_for_heart: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 200,
    right: 5,
    top: 3,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_heart: {
    color: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
    zIndex: 100,
  },
  infoContainer: {
    width: '100%',
    height: 110,
    padding: 10,
    paddingTop: 40,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'absolute',
    top: 138,
    zIndex: 2000,
    borderWidth: 1,
    borderColor: '#dddddd',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageToShow: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  nom_fiche: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 5,
  },
  location: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  location_text: {
    paddingLeft: 5,
  },
  sous_categorie: {
    borderColor: '#dddddd',
    borderWidth: 1,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 5,
    backgroundColor: 'white',
  },
  imageContainer_sc: {
    width: 25,
    height: 25,
  },
  sous_categorie_image: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
  },
  touchableProperty: {
    marginBottom: 15,
  },
  place_for_owner: {
    borderWidth: 1,
    borderColor: '#dddddd',
    width: 45,
    height: 45,
    position: 'absolute',
    right: 20,
    top: -25,
    borderRadius: 200,
    backgroundColor: 'white',
  },
  image_owner: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
  },
  sous_categorie_text: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  icon_replacement: {
    position: 'relative',
    top: 20,
    color: 'red',
  },
  voirplus: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnVoirPlus: {
    backgroundColor: '#56bdcd',
    padding: 10,
    borderRadius: 10,
    // height: 30,
  },
  textVoirPlus: {
    color: 'white',
  },
  activity: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Product;
