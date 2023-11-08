import React from "react";
import { View, Text, ScrollView, Image, Pressable, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, decrementQuantity, incrementQuantity } from "../redux/CartSlice";
import { PlusIcon, MinusIcon, TrashIcon } from "react-native-heroicons/outline";
import SearchBar from "../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart); // Accessing cart items from the Redux store

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decrementQuantity({ id: itemId }));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(incrementQuantity({ id: itemId }));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };
  
  const total = calculateTotalPrice();

  const handleCheckout = () => {
    // Implement your payment gateway logic here
    // For example, you can show an alert for demonstration purposes
    Alert.alert("Checkout", "Redirecting to Payment Gateway...");
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      {/* search bar */}
      <SearchBar />
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal : </Text>
        <Text style={styles.totalText}>{total}</Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>

      <Pressable style={styles.proceedButton}>
        <Text>Proceed to Buy ({cartItems.length}) items</Text>
      </Pressable>

      <Text style={styles.divider} />

      <ScrollView style={{ marginHorizontal: 10 }} showsVerticalScrollIndicator={false}>
        {cartItems?.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            <Pressable style={styles.itemContentContainer}>
              <View>
                <Image style={styles.itemImage} source={{ uri: item?.image }} />
              </View>

              <View style={styles.itemDetails}>
                <Text numberOfLines={3}>{item?.title}</Text>
                <Text style={styles.itemPrice}>{item?.price}</Text>
                <Image style={styles.stockImage} source={{ uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png" }} />
                <Text style={{ color: "green" }}>In Stock</Text>
              </View>
            </Pressable>

            <View style={styles.quantityContainer}>
              <Pressable onPress={() => handleDecreaseQuantity(item.id)} style={styles.quantityButton}>
                <MinusIcon name="minus" size={24} color="black" />
              </Pressable>
              <View style={styles.quantityTextContainer}>
                <Text>{item?.quantity}</Text>
              </View>
              <Pressable onPress={() => handleIncreaseQuantity(item.id)} style={styles.quantityButton}>
                <PlusIcon name="plus" size={24} color="black" />
              </Pressable>
            </View>

            <View style={styles.actionButtonsContainer}>
              <Pressable onPress={() => handleRemoveItem(item.id)} style={styles.deleteButton}>
                <TrashIcon  name="Delete" size={20} color="black"  />
                <Text>Delete</Text>
              </Pressable>
              <Pressable style={styles.deleteButton}>
                <Text>Save For Later</Text>
              </Pressable>
              <Pressable style={styles.deleteButton}>
                <Text>See More Like this</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  subtotalContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: "400",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  proceedButton: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  itemContainer: {
    backgroundColor: "white",
    marginVertical: 10,
    borderBottomColor: "#F0F0F0",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  itemContentContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemImage: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  itemDetails: {
    width: 150,
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
  },
  stockImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    backgroundColor: "#D8D8D8",
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  quantityTextContainer: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  deleteButton: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#C0C0C0",
    borderWidth: 0.6,
    flexDirection: "row",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
    marginTop : 15,
    justifyContent : 'space-between',
  },
});

export default CartScreen;
