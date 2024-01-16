import React, {useEffect, useRef, useState} from 'react';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faLocationPin} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {BASE_URL, ONLINE_URL} from '../helper/URL';
import {useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
const maxHeight = Dimensions.get('window').height - 75;

function ResultSearchBar({navigation}): JSX.Element {
  const route = useRoute();
  const {mc, loc} = route.params;
  const [tab, setTab] = useState([]);
  const [len, setLen] = useState(0);
  const [loadOrNot, setLoadOrNot] = useState(true);
  const ScrollViewRef = useRef();

  const getData = async () => {
    try {
      const res = await fetch(BASE_URL + 'globallySearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mc: mc,
          loc: loc,
        }),
      });

      if (res.ok) {
        const resultatText = await res.text();
        const result = JSON.parse(resultatText);
        // console.log(resultatText);

        setLen(result.data.length);
        setTab(result.data);
      }
      setLoadOrNot(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.container} ref={ScrollViewRef}>
      {loadOrNot ? (
        <Text style={styles.textResultatRecherche}>En cours de recherche</Text>
      ) : (
        <Text style={styles.textResultatRecherche}>
          {len} Resultats trouvés par Igoguide
        </Text>
      )}

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
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri:
                      ONLINE_URL +
                      'publics/' +
                      JSON.parse(elem.etablissements_photo)[0],
                  }}
                  style={styles.imageToShow}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.nom_fiche}>{elem.etablissements_nom}</Text>
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
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
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
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
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

      {loadOrNot ? <Text /> : <Text />}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
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
  },
  textVoirPlus: {
    color: 'white',
  },
  activity: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textResultatRecherche: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default ResultSearchBar;
