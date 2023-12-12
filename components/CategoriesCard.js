import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const CategoriesCard = (props) => {
  const { imgUrl, title, onPress} = props;
  const {width, height} = Dimensions.get('window')
  const Navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.container} onPress={() => Navigation.navigate('Product')}>
      <Image source={imgUrl} style={styles.image} />
      <Text className= "font-bold text-xm">{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    alignItems: 'center',
    position : 'relative'
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  title: {
    position: 'absolute',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 77, // Add margin-top to separate the image and text
  },
});

export default CategoriesCard;
