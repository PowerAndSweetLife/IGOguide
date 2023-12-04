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
import FastImage from 'react-native-fast-image';
const maxHeight = Dimensions.get('window').height - 200;

function Result({navigation, id, sc}): JSX.Element {
  const [tab, setTab] = useState([]);
  const [page, setPage] = useState(1);
  const [initialisation, setInitialisation] = useState(true);
  const [nomCategorie, setNomCategorie] = useState('');
  const [loadOrNot, setLoadOrNot] = useState(true);
  const ScrollViewRef = useRef();
  const getData = async () => {
    try {
      const res = await fetch(BASE_URL + 'getEtablissements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          sc: sc,
        }),
      });
      const resultText = await res.text();
      const data = JSON.parse(resultText);
      // const data = await res.json();
      // setTab(data[0]);
      setLoadOrNot(false);
    } catch (error) {
      console.error(error);
    }
  };
  if (initialisation) {
    getData();
  }

  useEffect(() => {
    setLoadOrNot(true);
    setInitialisation(false);
    const getDataPagination = async () => {
      try {
        const res = await fetch(BASE_URL + 'paginateEtablissements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            sc: sc,
            page: page,
          }),
        });
        const resultText = await res.text();
        const data = JSON.parse(resultText);
        // console.log(data);

        // const data = await res.json();
        setTab(data[0]);
        console.log(data[0].length);
        const nomc = data[0].categories_nom;

        if (nomc == 'Où boire ?') {
          setNomCategorie('Bar');
        } else if (nomc == 'Où manger ?') {
          setNomCategorie('Restaurant');
        } else {
          setNomCategorie(nomc);
        }

        // console.log(data[0]);
        ScrollViewRef.current.scrollTo({y: 0, animated: false});
        setLoadOrNot(false);
      } catch (error) {
        console.error(error);
      }
    };
    getDataPagination();
  }, [page]);

  return (
    <ScrollView style={styles.container} ref={ScrollViewRef}>
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
                  // source={require('../assets/images/img2.jpg')}
                  source={{
                    uri:
                      ONLINE_URL +
                      'publics/' +
                      JSON.parse(elem.etablissements_photo)[0],
                  }}
                  style={styles.imageToShow}
                  resizeMode={FastImage.resizeMode.cover}
                />
                {/* <View style={styles.place_for_heart}>
                  <FontAwesomeIcon icon={faHeart} style={styles.icon_heart} />
                </View> */}
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
      {/* {tab.map((elem, index) => (
        <TouchableOpacity
          key={index}
          style={styles.touchableProperty}
          onPress={() =>
            navigation.navigate('Détails', {id: elem.etablissements_id})
          }>
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/img2.jpg')}
                style={styles.imageToShow}
              />
              <View style={styles.place_for_heart}>
                <FontAwesomeIcon icon={faHeart} style={styles.icon_heart} />
              </View>
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
                <Image
                  source={require('../assets/images/avatar.png')}
                  style={styles.image_owner}
                />
              </View>
            </View>
          </View>
          <View style={styles.sous_categorie}>
            <Image
              source={require('../assets/icons/sous-categories/icon-ateliers-et-stages.png')}
              style={styles.sous_categorie_image}
            />
            <Text style={styles.sous_categorie_text}>
              {elem.sous_categories_nom}
            </Text>
          </View>
        </TouchableOpacity>
      ))} */}
      {/* <View style={styles.voirplus}>
        <View style={styles.btnVoirPlus}>
          <Text style={styles.textVoirPlus} onPress={() => setPage(page + 1)}>
            Afficher la suite
          </Text>
        </View>
      </View> */}
      {loadOrNot ? (
        <Text />
      ) : (
        <View style={styles.voirplus}>
          <View style={styles.btnVoirPlus}>
            <Text style={styles.textVoirPlus} onPress={() => setPage(page + 1)}>
              Afficher la suite
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
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

export default Result;
