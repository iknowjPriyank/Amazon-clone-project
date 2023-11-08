import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { EnvelopeIcon, LockClosedIcon, UserIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userData } from '../components/user';
import { SafeAreaView } from 'react-native-safe-area-context'




const RegisterScreen = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const Navigation = useNavigation();

  const validateName = () => {
    const namePattern = /^[a-zA-Z ]+$/;
    if (!namePattern.test(name)) {
      setNameError('Name should only contain letters and spaces');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6 || /[^a-zA-Z0-9]/.test(password)) {
      setPasswordError('Password must be at least 6 characters long and should not contain special characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleRegister = async () => {
    if (name && email && password) {
      if (validateName() && validateEmail() && validatePassword()) {
        try {
          userData.name = name;
          userData.email = email;
          userData.password = password;

          const existingData = await AsyncStorage.getItem('userData');
          let dataArray = [];

          if (existingData !== null) {
            dataArray = JSON.parse(existingData);
          }

          dataArray.push(userData);
          await AsyncStorage.setItem('userData', JSON.stringify(dataArray));

          Alert.alert('Registration Successful', 'You have registered successfully');
          Navigation.replace('LogIn');
        } catch (error) {
          console.error('Error saving user data: ', error);
        }
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };


  return (
    <SafeAreaView className=" bg-white flex-column justify-evenly">

      <View className="flex-1 items-center">
        <Image source={require('../assets/images/amazon.png')} style={{ height: 200, width: 300 }} />
      </View>

      <KeyboardAvoidingView>
        <View className="flex items-center">
          <Text className="font-bold text-2xl text-black mt-32">Register to Your Account</Text>
        </View>

        <View>
          {/* Name */}
          <View className="mt-20 flex-row items-center space-x-2 bg-gray-300 w-11/12 rounded-sm" style={{ alignSelf: 'center' }}>
            <View>
              <UserIcon size={25} color="gray" style={{ marginLeft: 10 }} />
            </View>
            <View className="w-10/12">
              <TextInput value={name} onChangeText={text => setName(text)} className="text-lg" placeholder='Enter Your Name here' />
            </View>
          </View>
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          {/* Email */}
          <View className="mt-10 flex-row items-center space-x-2 bg-gray-300 w-11/12 rounded-sm" style={{ alignSelf: 'center' }}>
            <View>
              <EnvelopeIcon size={25} color="gray" style={{ marginLeft: 10 }} />
            </View>
            <View className="w-10/12">
              <TextInput value={email} onChangeText={text => setEmail(text)} className="text-lg" placeholder='Enter Your Email here' />
            </View>
          </View>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          {/* Password */}
          <View className="mt-10 flex-row items-center space-x-2 bg-gray-300 w-11/12 rounded" style={{ alignSelf: 'center' }}>
            <View>
              <LockClosedIcon size={25} color="gray" style={{ marginLeft: 10 }} />
            </View>
            <View className="w-10/12">
              <TextInput value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} className="text-lg " placeholder='Enter Your Password here' />
            </View>
          </View>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <View className="flex-row justify-between w-11/12 mt-4 pr-2 pl-2" style={{ alignSelf: 'center' }}>
          <View>
            <Text className="text-lg text-black font-medium">Keep me logged in</Text>
          </View>
          <View>
            <Text onPress={() => Navigation.navigate('User')} className="text-lg font-semibold" style={{ color: '#007FFF' }}>Forgot Password</Text>
          </View>
        </View>

        <View className='mt-16' />

        <TouchableOpacity onPress={handleRegister} className="flex justify-center items-center w-8/12 bg-orange-400 h-16 rounded-md" style={{ alignSelf: 'center' }}>
          <Text className="text-lg text-white font-medium">Register</Text>
        </TouchableOpacity>

        <View className="flex-row mt-2 justify-center items-center" style={{ alignSelf: 'center' }}>
          <Text className="text-lg">Your already have an Account ? </Text>
          <Text className="text-lg text-blue-500" onPress={() => Navigation.navigate('LogIn')}>Sign In</Text>
        </View>

      </KeyboardAvoidingView>

      <View className='h-40' />


    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    marginLeft : 20,
  },
});