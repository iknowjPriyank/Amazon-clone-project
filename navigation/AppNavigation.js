import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon as OutlineHomeIcon, UserIcon as OutlineUserIcon, ShoppingCartIcon as OutlineShoppingCartIcon } from 'react-native-heroicons/outline';
import { HomeIcon as SolidHomeIcon, UserIcon as SolidUserIcon, ShoppingCartIcon as SolidShoppingCartIcon } from 'react-native-heroicons/solid';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import UserData from '../pages/UserData';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddAdressScreen from '../screens/AddAdressScreen';
import AddressScreen from '../screens/AddressScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <SolidHomeIcon name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <SolidUserIcon name="user" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarLabelStyle: { color: '#008E97' },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <SolidShoppingCartIcon name="shopping-cart" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LogIn'>
        <Stack.Screen
          name="LogIn"
          component={LoginScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Address"
          component={AddressScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="AddAddress"
          component={AddAdressScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="User"
          component={UserData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
