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
import MapView, {Callout, Marker} from 'react-native-maps';
const maxHeight = Dimensions.get('window').height - 200;

function Result({navigation, id, sc}): JSX.Element {
  const [tab, setTab] = useState([]);
  const [page, setPage] = useState(1);
  const [initialisation, setInitialisation] = useState(true);
  const [nomCategorie, setNomCategorie] = useState('');
  const [len, setLen] = useState(0);
  const [totalPaginationWalked, setTotalPaginationWalked] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadOrNot, setLoadOrNot] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const ScrollViewRef = useRef();
  const ShowNextPage = () => {
    setLoadingMore(true);
    setTotalPaginationWalked(totalPaginationWalked + 1);
  };

  const ShowPreviousPage = () => {
    setLoadingMore(true);
    setTotalPaginationWalked(totalPaginationWalked - 1);
  };

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
            page: totalPaginationWalked,
            totalPages: totalPages,
          }),
        });
        const resultText = await res.text();
        const data = JSON.parse(resultText);
        setTab(data[0]);
        const nomc = data[0].categories_nom;
        setTotalPages(data.TotalPage);
        setLen(data.TotalDonnees);
        if (nomc == 'Où boire ?') {
          setNomCategorie('Bar');
        } else if (nomc == 'Où manger ?') {
          setNomCategorie('Restaurant');
        } else {
          setNomCategorie(nomc);
        }
        setLoadOrNot(false);
        setLoadingMore(false);
      } catch (error) {
        console.error(error);
      }
    };
    getDataPagination();
  }, [totalPaginationWalked, loadingMore]);

  const [selectedTab, setSelectedTab] = useState(1);

  const changeTab = tabNumber => {
    setSelectedTab(tabNumber);
  };

  const renderInterface = () => {
    switch (selectedTab) {
      case 1:
        return (
          <ScrollView style={styles.container} ref={ScrollViewRef}>
            {loadOrNot ? (
              ''
            ) : !loadingMore && totalPaginationWalked === 1 ? (
              ''
            ) : len === 0 ? (
              ''
            ) : (
              <View style={styles.voirplus}>
                <View style={styles.btnVoirPlus}>
                  <Text
                    style={styles.textVoirPlus}
                    onPress={() => ShowPreviousPage()}>
                    Afficher la page précédente
                  </Text>
                </View>
              </View>
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
                        source={{
                          uri:
                            ONLINE_URL +
                            'publics/' +
                            JSON.parse(elem.etablissements_photo)[0],
                        }}
                        style={styles.imageToShow}
                        resizeMode={FastImage.resizeMode.cover}
                      />
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
            {loadOrNot ? (
              ''
            ) : !loadingMore && totalPages === totalPaginationWalked ? (
              ''
            ) : len === 0 ? (
              ''
            ) : (
              <View style={styles.voirplus}>
                <View style={styles.btnVoirPlus}>
                  <Text
                    style={styles.textVoirPlus}
                    onPress={() => ShowNextPage()}>
                    Afficher la page suivante
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
        );
      case 2:
        return (
          <View>
            <MapView
              style={styles.maps}
              initialRegion={{
                latitude: parseFloat(tab[0]?.etablissements_latitude),
                longitude: parseFloat(tab[0]?.etablissements_longitude),
                latitudeDelta: 10,
                longitudeDelta: 10,
              }}
              zoomControlEnabled={true}
              showsMyLocationButton={true}>
              {tab.map((eleme, ind) => (
                <Marker
                  key={ind}
                  coordinate={{
                    latitude: parseFloat(eleme.etablissements_latitude),
                    longitude: parseFloat(eleme.etablissements_longitude),
                  }}
                  title={eleme.etablissements_nom}
                  description={eleme.etablissements_adresse}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri:
                        ONLINE_URL +
                        'publics/image/icon_android/' +
                        eleme.categories_map_icon,
                    }}
                    style={{width: 35, height: 40}}
                  />
                </Marker>
              ))}
            </MapView>
          </View>
        );
    }
  };

  return (
    <View>
      <View style={styles.containerBulles}>
        <TouchableOpacity
          style={[
            styles.bulles,
            {borderColor: selectedTab === 1 ? 'orange' : '#dddddd'},
          ]}
          onPress={() => changeTab(1)}>
          <Text style={styles.textBulle}>Etablissements</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bulles,
            {borderColor: selectedTab === 2 ? 'orange' : '#dddddd'},
          ]}
          onPress={() => changeTab(2)}>
          <Text style={styles.textBulle}>Voir la carte</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.textResultatRecherche}>
          {len} Resultats trouvés par Igoguide
        </Text>
      </View>
      {renderInterface()}
    </View>
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
  containerBulles: {
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'row',
  },
  bulles: {
    width: '45%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maps: {
    width: '100%',
    height: maxHeight,
  },
  textBulle: {
    fontWeight: 'bold',
  },
  textResultatRecherche: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Result;
