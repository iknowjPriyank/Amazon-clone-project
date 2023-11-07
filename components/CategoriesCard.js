import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';

const CategoriesCard = (props) => {
  const { imgUrl, title} = props;
  return (
    <TouchableOpacity style={styles.container}>
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
