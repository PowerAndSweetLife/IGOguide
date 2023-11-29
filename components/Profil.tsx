import {faUserCircle} from '@fortawesome/free-regular-svg-icons';
import {
  faCamera,
  faListOl,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ImageBackground,
  Button,
} from 'react-native';
import {BASE_URL, ONLINE_URL} from '../helper/URL';
// import ImageCropPicker from 'react-native-image-crop-picker';
// import * as ImagePicker from 'expo-image-picker';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

function Profil({navigation}): JSX.Element {
  const [hoverState, setHoverState] = useState('');
  const [resultat, setResultat] = useState([]);
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const handleHover = () => {
    setHoverState('coloredHover');
  };

  const updateInformations = async () => {
    const idUpdate = await AsyncStorage.getItem('id');
    if (name == '' || email == '' || prenom == '') {
      Alert.alert('Attention', 'Certains champs sont obligatoires');
    } else {
      try {
        const send = await fetch(BASE_URL + 'updateInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idUpdate,
            nomU: name,
            prenomU: prenom,
            emailU: email,
          }),
        });
        if (send.ok) {
          const resultTextUpdate = await send.text();
          const resultUpdate = JSON.parse(resultTextUpdate);
          setName(resultUpdate.data.nom);
          setPrenom(resultUpdate.data.prenom);
          setEmail(resultUpdate.data.email);
          Alert.alert('Profil modifié avec succès');
        } else {
          Alert.alert('Veuiller ré-essayer ultérieurement');
        }
      } catch (error) {
        Alert.alert('Veuiller ré-essayer ultérieurement');
      }
    }
  };

  const changePassword = async () => {
    const idPass = await AsyncStorage.getItem('id');
    if (oldPass == '' || newPass == '' || confirmNewPass == '') {
      Alert.alert('Attention', 'Certains champs sont obligatoires');
    } else {
      try {
        const resPass = await fetch(BASE_URL + 'updatePassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idPass,
            oldPassUpdate: oldPass,
            newPassUpdate: newPass,
            confirmNewPassUpdate: confirmNewPass,
          }),
        });

        if (resPass.ok) {
          const resultTextPass = await resPass.text();
          const resultPass = JSON.parse(resultTextPass);

          if (resultPass.success) {
            setNewPass('');
            setOldPass('');
            setConfirmNewPass('');
            Alert.alert('Mot de passe modifié avec succès');
          } else {
            Alert.alert(resultPass.error);
          }
        }
      } catch (error) {
        Alert.alert('Erreur !', 'Erreur de connexion au serveur !');
      }
    }
  };
  const getData = async () => {
    const id = await AsyncStorage.getItem('id');
    try {
      const res = await fetch(BASE_URL + 'getUser', {
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
        setName(result.data[0].users_nom);
        setPhoto(result.data[0].users_photo);
        setPrenom(result.data[0].users_prenoms);
        setEmail(result.data[0].users_email);
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
  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (result.canceled) {
    } else {
      const fileExtension = result.assets[0].uri.split('.').pop();
      const fileName = `image_${Date.now()}.${fileExtension}`;
      var data = new FormData();
      data.append('image', {
        uri: result.assets[0].uri,
        name: fileName,
        type: `image/${fileExtension}`,
      });

      const id = await AsyncStorage.getItem('id');
      data.append('id', id);

      try {
        const resI = await fetch(BASE_URL + 'modifyPDP', {
          body: data,
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (resI.ok) {
          const resImageFromServer = await resI.text();
          setPhoto(resImageFromServer);
        }
      } catch (error) {
        Alert.alert('Erreur de reseau');
      }
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.placeForProfil}>
          <View style={styles.pdp}>
            <Image
              resizeMode="cover"
              source={
                photo != ''
                  ? {
                      uri: BASE_URL + 'publics/' + photo,
                    }
                  : require('../assets/images/avatar.png')
              }
              style={styles.image_pdp}
            />
            <Pressable>
              <FontAwesomeIcon
                style={styles.camera}
                icon={faCamera}
                size={30}
              />
            </Pressable>
          </View>
        </View>
        <View>
          <Text style={styles.centerInfo}>{name}</Text>
        </View>
        <View style={styles.modifContainer}>
          <Pressable
            onHoverIn={() => {
              handleHover();
            }}
            style={[styles.centerMenu]}>
            <Text style={styles.menu_style}>
              <FontAwesomeIcon
                style={styles.iconReform}
                icon={faUserCircle}
                size={22}
              />
              {'   '}
              Informations
            </Text>
          </Pressable>
          <View style={styles.box}>
            <TextInput
              placeholder="Nom"
              value={name}
              style={styles.inputReform}
              onChangeText={text => setName(text)}
            />
            <TextInput
              placeholder="Prénom"
              value={prenom}
              style={styles.inputReform}
              onChangeText={text => setPrenom(text)}
            />
            <TextInput
              value={email}
              placeholder="E-mail"
              style={styles.inputReform}
              onChangeText={text => setEmail(text)}
            />
            <Button
              title="Modifier"
              onPress={() => {
                updateInformations();
              }}
            />
          </View>

          <Pressable style={styles.centerMenu}>
            <Text style={styles.menu_style}>
              <FontAwesomeIcon
                style={styles.iconReform}
                icon={faLock}
                size={22}
              />
              {'   '}
              Mot de passe
            </Text>
          </Pressable>
          <View style={styles.box}>
            <TextInput
              secureTextEntry={true}
              style={styles.inputReform}
              placeholder="Ancien mot de passe"
              value={oldPass}
              onChangeText={text => setOldPass(text)}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.inputReform}
              placeholder="Nouveau mot de passe"
              value={newPass}
              onChangeText={text => setNewPass(text)}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.inputReform}
              placeholder="Confirmer nouveau mot de passe"
              value={confirmNewPass}
              onChangeText={text => setConfirmNewPass(text)}
            />
            <Button
              title="Modifier"
              onPress={() => {
                changePassword();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pdp: {
    width: 150,
    height: 150,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: '#dddddd',
  },
  image_pdp: {
    width: 145,
    height: 145,
    borderRadius: 200,
    // borderWidth: 3,
    // borderColor: '#dddddd',
  },
  placeForProfil: {
    padding: 25,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  centerInfo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menu_style: {
    fontSize: 20,
  },
  iconReform: {
    fontSize: 20,
    color: '#aba9a8',
  },
  centerMenu: {
    marginBottom: 15,
  },
  modifContainer: {
    padding: 30,
  },
  camera: {
    position: 'absolute',
    bottom: -5,
    right: 10,
    color: '#aba9a8',
  },
  inputReform: {
    borderWidth: 1,
    borderColor: '#dddddd',
    height: 50,
    borderRadius: 5,
    marginBottom: 5,
    paddingLeft: 20,
  },
  box: {
    marginBottom: 50,
  },
});

export default Profil;
