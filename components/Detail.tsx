import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';

import {
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {BASE_URL, ONLINE_URL} from '../helper/URL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Marker} from 'react-native-maps';

function Detail({navigation, id}): JSX.Element {
  const [nomForm, setNomForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [objetForm, setObjetForm] = useState('');
  const [messageForm, setMessageForm] = useState('');
  const [loadOrNot, setLoadOrNot] = useState(true);
  const [activites, setActivites] = useState({});

  const [dataResult, setDataResult] = useState([]);

  const sendEmail = async () => {
    if (
      nomForm === '' ||
      emailForm === '' ||
      objetForm === '' ||
      messageForm === ''
    ) {
      Alert.alert('Attention', 'Certains champs sont obligatoires');
    } else {
      try {
        const res = await fetch(BASE_URL + 'sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: nomForm,
            email: emailForm,
            objet: objetForm,
            message: messageForm,
          }),
        });
        console.log(res);
        if (res.ok) {
          const resultText = await res.text();
          const result = JSON.parse(resultText);
          if (result.success) {
            Alert.alert('Succes', 'Envoi avec succes !');
          } else {
            Alert.alert('Attention', 'E-mail non envoye!');
          }
        } else {
          Alert.alert('Erreur !', 'Re-essayer plus tard');
        }
      } catch (error) {
        Alert.alert('Erreur', 'Erreur de connexion au serveur');
      }
    }
  };

  const getData = async () => {
    try {
      const res = await fetch(BASE_URL + 'getInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (res.ok) {
        const resultText = await res.text();
        const result = JSON.parse(resultText);
        setDataResult(result);
        setLoadOrNot(false);
        // const act = result.etablissements_activites;
        setActivites(JSON.parse(result[0].etablissements_activites));
      } else {
        Alert.alert('Attention', 'Aucune donnees !');
      }
    } catch (error) {
      Alert.alert('Erreur !', 'Erreur de connexion au serveur !');
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const addToFavorite = async () => {
    const iduser = await AsyncStorage.getItem('id');

    if (iduser === null) {
      navigation.navigate('Connexion', {fromScreen: 'favorite', idresult: id});
    } else {
      try {
        const resFav = await fetch(BASE_URL + 'addToFavorite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_user: iduser,
            id_etab: id,
          }),
        });
        // console.log(resFav);
        if (resFav.ok) {
          const resultTextFav = await resFav.text();
          const resultFav = JSON.parse(resultTextFav);
          if (resultFav.success) {
            Alert.alert('Succès', resultFav.message);
          } else {
            Alert.alert('Attention', resultFav.message);
          }
        } else {
          Alert.alert('Erreur !', 'Re-essayer !');
        }
      } catch (error) {
        Alert.alert('Erreur !', 'Erreur de connexion au serveur !');
      }
    }
  };

  return (
    <ScrollView>
      {loadOrNot ? (
        <View style={styles.activity}>
          <ActivityIndicator color="#52b7c6" />
        </View>
      ) : (
        dataResult.map((elem, index) => (
          <View key={index}>
            <View style={styles.header}>
              <Image
                // source={require('../assets/images/img4.jpg')}
                source={{
                  uri:
                    ONLINE_URL +
                    'publics/' +
                    JSON.parse(elem.etablissements_photo)[0],
                }}
                style={styles.header_image}
              />
              <TouchableOpacity
                style={styles.place_for_icon_right}
                onPress={() => {
                  addToFavorite();
                }}>
                <FontAwesomeIcon icon={faHeart} style={styles.icon_heart} />
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.place_for_icon_left}>
                <FontAwesomeIcon icon={faArrowLeft} style={styles.arrow} />
              </TouchableOpacity> */}
            </View>

            <View style={styles.information_box}>
              <View style={styles.owner}>
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
              <View style={styles.owner_info}>
                <Text style={styles.owner_name}>{elem.etablissements_nom}</Text>
                <Text style={styles.owner_name}>
                  {elem.categories_nom} . {elem.sous_categories_nom}
                </Text>
                <Text>{elem.etablissements_presentation}</Text>
              </View>
            </View>
            <View style={styles.divers}>
              <Text style={styles.info_utile}>Informations utiles</Text>
              <Text style={styles.services_inclus}>
                Informations sur les services inclus
              </Text>
              {Object.entries(activites).map(([a, b]) =>
                b != null && b != '' ? (
                  b === 'on' ? (
                    <Text key={a}>{a}: Oui</Text>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                ),
              )}
              <Text style={styles.services_inclus}>
                Informations sur la localisation
              </Text>
              <Text>{elem.etablissements_adresse}</Text>
            </View>
            <View style={styles.contact_us}>
              <Text style={styles.title_nous_contacter}>Nous contacter</Text>
              <TextInput
                style={styles.form_modif}
                placeholder="Nom"
                value={nomForm}
                onChangeText={text => setNomForm(text)}
              />
              <TextInput
                style={styles.form_modif}
                placeholder="E-mail"
                value={emailForm}
                onChangeText={text => setEmailForm(text)}
              />
              <TextInput
                style={styles.form_modif}
                placeholder="Objets"
                value={objetForm}
                onChangeText={text => setObjetForm(text)}
              />
              <TextInput
                value={messageForm}
                style={styles.text_area}
                placeholder="Votre message"
                multiline={true}
                numberOfLines={4}
                onChangeText={text => setMessageForm(text)}
              />
              <Button
                color="#e0a800"
                onPress={() => {
                  sendEmail();
                }}
                title="Envoyer"
              />
            </View>
            <View>
              <Text
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  fontSize: 18,
                  color: '#5faca5',
                }}>
                Voulez-vous en savoir plus sur la région ?
              </Text>
              <MapView
                style={styles.maps}
                initialRegion={{
                  latitude: parseFloat(elem.etablissements_latitude),
                  longitude: parseFloat(elem.etablissements_longitude),
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                zoomControlEnabled={true}
                showsMyLocationButton={true}>
                <Marker
                  coordinate={{
                    latitude: parseFloat(elem.etablissements_latitude),
                    longitude: parseFloat(elem.etablissements_longitude),
                  }}
                  title={elem.etablissements_nom} // Titre du marqueur
                  description={elem.etablissements_adresse} // Description du marqueur
                  // image={require('../assets/Epingles/act_50.png')}
                >
                  <Image
                    source={{
                      uri:
                        ONLINE_URL +
                        'publics/image/icon_android/' +
                        elem.categories_map_icon,
                    }}
                    style={{width: 35, height: 40}}
                  />
                </Marker>
              </MapView>
            </View>
          </View>
        ))
      )}
      {/* <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
            title="Marker Title"
            description="Marker Description"
          />
        </MapView>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 250,
  },
  header_image: {
    height: 250,
    width: '100%',
    resizeMode: 'cover',
  },
  place_for_icon_right: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 200,
    right: 10,
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  place_for_icon_left: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 200,
    left: 10,
    top: 10,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_heart: {
    color: 'white',
  },
  arrow: {
    color: 'white',
  },
  information_box: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    // height: 100,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 10,
    // backgroundColor: 'green',
  },
  image_owner: {
    width: 40,
    height: 40,
    borderRadius: 200,
    resizeMode: 'cover',
    backgroundColor: 'white',
    borderColor: '#dddddd',
    borderWidth: 1,
  },
  owner: {
    // justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    // backgroundColor: 'red',
  },
  owner_info: {
    // backgroundColor: 'yellow',
    width: '80%',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 2,
  },
  owner_name: {
    fontWeight: 'bold',
  },
  divers: {
    // height: 300,
    backgroundColor: '#f5eee6',
    padding: 15,
  },
  info_utile: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  services_inclus: {
    color: '#cc9900',
  },
  contact_us: {
    marginTop: 5,
    padding: 15,
  },
  title_nous_contacter: {
    fontWeight: 'bold',
  },
  form_modif: {
    borderColor: '#dddddd',
    borderWidth: 1,
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
  },
  text_area: {
    borderColor: '#dddddd',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  activity: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  maps: {
    width: '100%',
    height: 400,
    // backgroundColor: 'yellow',
    marginTop: 15,
  },
});

export default Detail;
