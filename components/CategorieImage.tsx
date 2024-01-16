import React from 'react';
import {Image, StyleSheet} from 'react-native';

function CategorieImage({imageSource}): JSX.Element {
  return <Image source={imageSource} style={styles.icon} />;
}
const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 50,
    resizeMode: 'contain',
  },
});

export default CategorieImage;
