import React from 'react';
import {Image, StyleSheet} from 'react-native';

function ImageForResult({imageSource}): JSX.Element {
  return <Image source={imageSource} style={styles.icon} />;
}
const styles = StyleSheet.create({
  icon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderWidth: 4,
    borderColor: 'red',
  },
});

export default ImageForResult;
