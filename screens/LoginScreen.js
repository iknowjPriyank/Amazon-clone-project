import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context'



const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const Navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Retrieve user data from AsyncStorage
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const userDataArray = JSON.parse(data);
        // Check if the entered email and password match any stored user data
        const user = userDataArray.find(user => user.email === email && user.password === password);
        if (user) {
          // Navigate to HomeScreen if user data is found
          Navigation.replace('Main');
        } else {
          // Display alert message if user is not registered
          Alert.alert('Error', 'You are not registered. Please sign up.');
        }
      } else {
        // Display alert message if no user data is found
        Alert.alert('Error', 'No user data found. Please sign up.');
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  return (
    <SafeAreaView className=" bg-white flex-column justify-evenly">

      <View className="flex-1 items-center">
        <Image source={require('../assets/images/amazon.png')} style={{ height: 200, width: 300 }} />
      </View>

      <KeyboardAvoidingView>
        <View className="flex items-center">
          <Text className="font-bold text-2xl text-black mt-32">Login into Your Account</Text>
        </View>

        <View>
          <View className="mt-20 flex-row items-center space-x-2 bg-gray-300 w-11/12 rounded-sm" style={{ alignSelf: 'center' }}>
            <View>
              <EnvelopeIcon size={25} color="gray" style={{ marginLeft: 10 }} />
            </View>
            <View className="w-10/12">
              <TextInput value={email} onChangeText={text => setEmail(text)} className="text-lg" placeholder='Enter Your Email here' />
            </View>
          </View>
          <View className="mt-10 flex-row items-center space-x-2 bg-gray-300 w-11/12 rounded" style={{ alignSelf: 'center' }}>
            <View>
              <LockClosedIcon size={25} color="gray" style={{ marginLeft: 10 }} />
            </View>
            <View className="w-10/12">
              <TextInput value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} className="text-lg " placeholder='Enter Your Password here' />
            </View>
          </View>
        </View>

        <View className="flex-row justify-between w-11/12 mt-4 pr-2 pl-2" style={{ alignSelf: 'center' }}>
          <View>
            <Text className="text-lg text-black font-medium">Keep me logged in</Text>
          </View>
          <View>
            <Text onPress={() => Navigation.navigate('User')} className="text-lg font-semibold" style={{ color: '#007FFF' }}>Forgot Password</Text>
          </View>
        </View>

        <View className='mt-32' />

        <TouchableOpacity onPress={handleLogin} className="flex justify-center items-center w-8/12 bg-orange-400 h-16 rounded-md" style={{ alignSelf: 'center' }}>
          <Text className="text-lg text-white font-medium">Log In</Text>
        </TouchableOpacity>

        <View className="flex-row mt-2 justify-center items-center" style={{ alignSelf: 'center' }}>
          <Text className="text-lg">Don't have an Account ? </Text>
          <Text className="text-lg text-blue-500" onPress={() => Navigation.navigate('Register')}>Sign Up</Text>
        </View>

      </KeyboardAvoidingView>

      <View className='h-44' />


    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})