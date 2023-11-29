import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IconInsertion from './IconInsertion';

function Navbar(): JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.inlineBlock}>
        <IconInsertion
          imageSource={require('../assets/icons/accueil.webp')}
        />
      </View>
      <View style={styles.inlineBlock}>
        <IconInsertion
          imageSource={require('../assets/icons/hebergement.webp')}
        />
      </View>
      <View style={styles.inlineBlock}>
        <IconInsertion imageSource={require('../assets/icons/bar.webp')} />
      </View>
      <View style={styles.inlineBlock}>
        <IconInsertion
          imageSource={require('../assets/icons/restaurant.webp')}
        />
      </View>
      <View style={styles.inlineBlock}>
        <IconInsertion
          imageSource={require('../assets/icons/balades.webp')}
        />
      </View>
      <View style={styles.inlineBlock}>
        <IconInsertion
          imageSource={require('../assets/icons/activites.webp')}
        />
      </View>
      <View style={styles.inlineBlock}>
        <IconInsertion
          imageSource={require('../assets/icons/services.webp')}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    padding: 5,
  },
  inlineBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    // backgroundColor: 'red',
    // margin: 2,
  },
  //   textIcon: {
  //     fontSize: 8,
  //     marginTop: 5,
  //     color: 'white',
  //   }
});

export default Navbar;
