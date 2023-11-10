import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MapPinIcon,BellIcon } from "react-native-heroicons/outline";

const amazonImg = require('../assets/images/amazon.co.png')


const ProfileScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
        height : 70,
      },
      headerLeft: () => (
        <Image
          style={{ width: 200, height: 200, resizeMode: "contain", marginTop : 10}}
          source={amazonImg}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 5,
          }}
        >
          <BellIcon name="notifications-outline" size={30} color="black" />
          <MapPinIcon name="search1" size={30} color="black" />

        </View>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
    <Text style={{ fontSize: 24, fontWeight: "bold", color : 'black' }}>
      Welcome Priyank
    </Text>

    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 12,
      }}
    >
      <Pressable
        style={{
          padding: 10,
          backgroundColor: "#E0E0E0",
          borderRadius: 25,
          flex: 1,
        }}
      >
        <Text style={{ textAlign: "center" }}>Your orders</Text>
      </Pressable>

      <Pressable
        style={{
          padding: 10,
          backgroundColor: "#E0E0E0",
          borderRadius: 25,
          flex: 1,
        }}
      >
        <Text style={{ textAlign: "center" }}>Your Account</Text>
      </Pressable>
    </View>

    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 12,
      }}
    >
      <Pressable
        style={{
          padding: 10,
          backgroundColor: "#E0E0E0",
          borderRadius: 25,
          flex: 1,
        }}
      >
        <Text style={{ textAlign: "center" }}>Buy Again</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.replace('LogIn')}
        style={{
          padding: 10,
          backgroundColor: "#E0E0E0",
          borderRadius: 25,
          flex: 1,
        }}
      >
        <Text style={{ textAlign: "center" }}>Logout</Text>
      </Pressable>
    </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})