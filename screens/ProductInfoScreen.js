import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, ImageBackground, Dimensions, Alert, Image } from 'react-native';
import { ShareIcon, HeartIcon } from 'react-native-heroicons/outline';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import { StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';




const ProductInfoScreen = () => {


    const Route = useRoute();
    const Navigation = useNavigation();
    const [addedToCart, setAddedToCart] = useState(false);
    const { width } = Dimensions.get("window");
    const dispatch = useDispatch();

    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        }, 3000);
    };
  
    function handleBuyNow(){
        addItemToCart(Route?.params)
        Navigation.navigate('Cart')
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <SearchBar />
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {Route.params.carouselImages.map((item, index) => (
                            <ImageBackground
                                style={styles.carouselImage}
                                source={{ uri: item }}
                                key={index}
                            >
                                <View style={{ padding: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <View style={styles.discountBadge}>
                                        <Text style={{ color: "white", textAlign: "center", fontWeight: "600", fontSize: 12 }}>
                                            {Route?.params?.offer} off
                                        </Text>
                                    </View>
                                    <View style={styles.shareButton}>
                                        <ShareIcon name="share-variant" size={24} color="black" />
                                    </View>
                                </View>

                                <View style={styles.heartButton}>
                                    <HeartIcon name="hearto" size={24} color="black" />
                                </View>
                            </ImageBackground>
                        ))}
                    </ScrollView>

                    <View style={styles.productInfoContainer}>
                        <Text style={styles.productTitle}>
                            {Route?.params?.title}
                        </Text>
                        <Text style={styles.productPrice}>
                            Price :- ₹{Route?.params?.price}
                        </Text>
                    </View>

                    <View style={styles.productDetail}>
                        <Text style={styles.productDetailLabel}>Color: </Text>
                        <Text style={styles.productDetailValue}>
                            {Route?.params?.color}
                        </Text>
                    </View>

                    <View style={styles.productDetail}>
                        <Text style={styles.productDetailLabel}>Size: </Text>
                        <Text style={styles.productDetailValue}>
                            {Route?.params?.size}
                        </Text>
                    </View>

                    <View style={styles.productInfoContainer}>
                        <Text style={{ color: "#00CED1" }}>
                            FREE delivery Tomorrow by 3 PM. Order within 10hrs 30 mins
                        </Text>
                    </View>

                    <Text style={styles.stockStatus}>
                        IN Stock
                    </Text>

                    <Pressable
                        onPress={() => addItemToCart(Route?.params)}
                        style={addedToCart ? styles.addToCartButton : styles.addToCartButton}

                    >
                        {addedToCart ? (
                            <View>
                                <Text>Added to Cart</Text>
                            </View>
                        ) : (
                            <Text>Add to Cart</Text>
                        )}
                    </Pressable>

                    <Pressable style={styles.buyNowButton} onPress={handleBuyNow}>
                        <Text>Buy Now</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductInfoScreen;


const styles = StyleSheet.create({
    carouselImage: {
        width: Dimensions.get("window").width,
        height: 400,
        resizeMode: "contain",
    },
    discountBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#C60C30",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    shareButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    heartButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: "auto",
        marginLeft: 20,
        marginBottom: 20,
    },
    productInfoContainer: {
        padding: 10,
    },
    productTitle: {
        fontSize: 15,
        fontWeight: "500",
    },
    productPrice: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 6,
    },
    productDetail: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    productDetailLabel: {
        fontSize: 15,
        fontWeight: "bold",
    },
    productDetailValue: {
        fontSize: 15,
        fontWeight: "bold",
    },
    stockStatus: {
        color: "green",
        marginHorizontal: 10,
        fontWeight: "500",
    },
    addToCartButton: {
        backgroundColor: "#FFAC1C",
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },
    buyNowButton: {
        backgroundColor: "#FFAC1C",
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },
});