import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {BASE_URL, ONLINE_URL} from '../helper/URL';
import FastImage from 'react-native-fast-image';

function SousCategories({navigation, id}): JSX.Element {
  const [dataSC, setDataSC] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(BASE_URL + 'getSC', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_sc: id,
          }),
        });
        const resultText = await res.text();
        const data = JSON.parse(resultText);

        setDataSC(data.data);
        setLoading(false);
      } catch (error) {}
    };

    getData();
  }, [id]);

  return (
    <SafeAreaView>
      <ScrollView>
        {loading ? (
          <ActivityIndicator style={styles.loadingIndicator} color="#52b7c6" />
        ) : (
          <View style={styles.content}>
            {dataSC.map((elem, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Resultat', {
                    id: id,
                    sc: elem.sous_categories_id,
                  })
                }
                key={index}>
                <View style={styles.contentStyle}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    source={{
                      uri:
                        ONLINE_URL +
                        'publics/image/icon-sous-categories/' +
                        elem.sous_categories_icon,
                    }}
                    style={styles.imageToShow}
                  />
                  <Text style={styles.text_sc}>{elem.sous_categories_nom}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 30,
    paddingBottom: 10,
    flexWrap: 'wrap',
    paddingLeft: 25,
    paddingRight: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentStyle: {
    width: 150,
    height: 150,
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
  imageToShow: {
    width: 80,
    height: 90,
  },
  loadingIndicator: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_sc: {
    padding: 5,
    fontSize: 13,
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
  },
});

export default SousCategories;
