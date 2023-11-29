import React from 'react';
import {Image, StyleSheet} from 'react-native';

function IconInsertion({imageSource}): JSX.Element {
  return <Image source={imageSource} style={styles.icon} />;
}
const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 60,
    resizeMode: 'contain',
  },
});

export default IconInsertion;
