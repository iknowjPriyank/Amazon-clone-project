import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import ProductItem from "../components/ProductItem";
import { addToCart } from "../redux/CartSlice";
import axios from "axios";

const DropDownComponent = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "Women's clothing", value: "women's clothing" },
  ]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.log("error message", error);
    }
  };

  const onAddToCart = (item) => {
    dispatch(addToCart(item));
    console.log("Added to cart:", item.title);
  };

  // Using setInterval to fetch data every 3 seconds
  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 3000); // Fetch data every 3 seconds

    // Clean up interval on component unmount
    return () => {
      clearInterval(fetchDataInterval);
    };
  }, []); // Empty dependency array ensures that the effect runs once after the initial render

  const onGenderOpen = useCallback(() => {}, []);

  return (
    <ScrollView>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 20,
          width: "45%",
          marginBottom: open ? 50 : 15,
        }}
      >
        <DropDownPicker
          style={{
            borderColor: "#B7B7B7",
            height: 30,
            marginBottom: open ? 120 : 15,
          }}
          open={open}
          value={category}
          items={items}
          setOpen={setOpen}
          setValue={setCategory}
          setItems={setItems}
          placeholder="choose category"
          placeholderStyle={styles.placeholderStyles}
          onOpen={onGenderOpen}
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {products
          ?.filter((item) => item.category === category)
          .map((product) => (
            <ProductItem
              key={product.id}
              item={product}
              addedToCart={onAddToCart}
            />
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default DropDownComponent;
