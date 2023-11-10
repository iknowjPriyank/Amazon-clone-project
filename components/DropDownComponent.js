import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import ProductItem from "../components/ProductItem";
import { addToCart } from "../redux/CartSlice";
import { products } from "../pages/db";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "./SearchBar";

const DropDownComponent = () => {
  const Navigation = useNavigation()

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);



  const onAddToCart = (item) => {
    dispatch(addToCart(item));
    console.log("Added to cart:", item.title);
  };

  return (
    <ScrollView>
      <SearchBar />
      <View style={styles.constainer}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent : 'space-evenly' }}>
          {products.map((item, index) => (
            <ProductItem
              key={item.id}
              item={item}
              addedToCart={onAddToCart}
            />
          ))}

        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  constainer: {
    marginTop: 10,
    width: "100%",
    marginBottom: 15,
    
  }
});

export default DropDownComponent;