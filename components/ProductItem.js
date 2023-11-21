import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 2; 

const ProductItem = ({ item }) => {
  const Navigation = useNavigation()
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);

  const addItemToCart = () => {
    if (!isItemInCart) {
      dispatch(addToCart(item));
      console.log('Added to cart:', item.title);
    } else {
      console.log('Item is already in the cart:', item.title);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        Navigation.navigate('Info', {
          id: item?.id,
          title: item?.title,
          image: item?.image,
          description : item?.description,
          stock : item?.stock,
          offer: item?.offer,
          price: item?.price,
          carouselImages: item.carouselImages,
          color: item?.color,
          size: item?.size,
          oldPrice: item?.oldPrice,
          item: item,
        })
      }
    >
      <Image style={styles.image} source={{ uri: item?.image }} resizeMode="contain" />

      <Text numberOfLines={2} style={styles.title}>
        {item?.title}
      </Text>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item?.price}</Text>
        <Text style={styles.rating}>{item?.rating} ratings</Text>
      </View>

      <TouchableOpacity
        onPress={addItemToCart}
        style={[styles.addToCartButton, { backgroundColor: isItemInCart ? '#ccc' : '#FFC72C' }]}
        disabled={isItemInCart}
      >
        <Text style={styles.addToCartButtonText}>
          {isItemInCart ? 'Added to Cart' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 160,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    color: 'red',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#FFC72C',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductItem;
