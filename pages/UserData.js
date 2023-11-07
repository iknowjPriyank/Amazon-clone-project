import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserData = () => {
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve user data array from AsyncStorage
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          const userDataArray = JSON.parse(data);
          setUserArray(userDataArray);
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteData = async (index) => {
    try {
      // Remove the specific user data from AsyncStorage
      const updatedUserData = userArray.filter((_, i) => i !== index);
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserArray(updatedUserData);
      console.log('User data deleted successfully.');
    } catch (error) {
      console.error('Error deleting user data: ', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userArray.length > 0 ? (
        <View>
          {userArray.map((user, index) => (
            <View key={index}>
              <Text>Name: {user.name}</Text>
              <Text>Email: {user.email}</Text>
              <Text>Password: {user.password}</Text>
              <TouchableOpacity onPress={() => handleDeleteData(index)} style={{ marginTop: 10, backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>Delete Data</Text>
              </TouchableOpacity>
              <View style={{ marginTop: 20 }} />
            </View>
          ))}
        </View>
      ) : (
        <Text>No user data available</Text>
      )}
    </SafeAreaView>
  );
};

export default UserData;
