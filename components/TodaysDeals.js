import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { offers } from './database';

const TodaysDeals = () => {

  
  const Navigation = useNavigation();

    

    return (
        <View>
        <Text style={styles.heading}>Trending deals of the week</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          <View style={styles.dealsContainer}>
            {offers.map((item, index) => (
              <TouchableOpacity
                style={styles.dealItem}
                key={item.id}
                onPress={() =>
                  Navigation.navigate("Info", {
                    id: item.id,
                    image: item.image,
                    title: item.title,
                    price: item?.price,
                    offer: item?.offer,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                  })
                }
              >
                <Image style={styles.image} source={{ uri: item?.image }} />
                <TouchableOpacity style={styles.addToCartButton} >
                  <Text style={styles.addToCartButtonText}>{item?.offer} off</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        marginBottom: 20,
    },
    heading: {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    dealsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dealItem: {
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 5,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    discountText: {
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF5733', // You can choose your desired color for the discount text
        marginVertical: 8,
    },
    addToCartButton: {
        backgroundColor: "#007bff",
        paddingVertical: 5,
        paddingHorizontal : 25,
        borderRadius: 5,
        marginTop: 8,

      },
      addToCartButtonText: {
        color: "white",
        fontWeight: "bold",
      },
});

export default TodaysDeals;