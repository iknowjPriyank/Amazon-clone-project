import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, decrementQuantity, incrementQuantity } from "../redux/CartSlice";
import SearchBar from "../components/SearchBar";

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

  const handleCheckout = () => {
    // Implement your payment gateway logic here
    // For example, you can show an alert for demonstration purposes
    Alert.alert("Checkout", "Redirecting to Payment Gateway...");
  };
  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };
  const totalPrice = calculateTotalPrice();

  return (
    <View style={styles.container}>
      <SearchBar />

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your Cart is Empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          renderItem={({ item }) => (
            
            <View style={styles.cartItemContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.thumbnail}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>Rs.{item.price} x {item.quantity}</Text>
                <Text style={styles.total}>Total: Rs.{item.price * item.quantity}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => handleRemoveItem(item.id)}>
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => handleDecreaseQuantity(item.id)}>
                    <Text style={styles.buttonText}>-1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => handleIncreaseQuantity(item.id)}>
                    <Text style={styles.buttonText}>+1</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}


      {cartItems.length > 0 && (
        <View>
          <View style={styles.checkoutContainer}>
            <Text style={styles.total}>Total: Rs.{totalPrice}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  emptyCartText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#888",
  },
  cartItemContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff9900",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginHorizontal: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 16,
    alignItems: "center",
    margin: 16,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  checkoutContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CartScreen;
