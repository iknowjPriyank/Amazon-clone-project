import React, { useState, useRef } from 'react';
import { StyleSheet, Image, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const ImageSlider = () => {
  const imageItems = [
    require('../assets/appImg/IndianSale.jpg'),
    require('../assets/appImg/mobileSale.jpg'),
    require('../assets/appImg/primeSale.webp'),
    require('../assets/appImg/shoppingSale.jpg'),
  ];

  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotPress = (index) => {
    setActiveIndex(index);
    scrollViewRef.current.scrollTo({ x: index * width, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(newIndex);
        }}
        scrollEventThrottle={16}
      >
        {imageItems.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={item} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {imageItems.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.paginationDot, index === activeIndex && styles.activeDot]}
            onPress={() => handleDotPress(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  imageContainer: {
    width: width,
    paddingLeft : 5,
    paddingRight : 5,
    height: 280,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007bff',
  },
});

export default ImageSlider;
