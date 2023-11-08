import { Alert, StyleSheet, Text, View, ScrollView,  TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MicrophoneIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { KeyboardAvoidingView } from 'react-native'

const EditAddressScreen = () => {
  
    const Navigation = useNavigation();
    const route = useRoute();
    const { addressData } = route.params; // Access the address data passed from AddressScreen

    const [fullName, setFullName] = useState(addressData.fullName || '');
    const [mobileNumber, setMobileNumber] = useState(addressData.mobileNumber || '');
    const [addressLine1, setAddressLine1] = useState(addressData.addressLine1 || '');
    const [addressLine2, setAddressLine2] = useState(addressData.addressLine2 || '');
    const [landmark, setLandmark] = useState(addressData.landmark || '');
    const [pincode, setPincode] = useState(addressData.pincode || '');

    const handleSubmit = async () => {
        try {
            // Validate input fields (add more validation logic if needed)
            if (!fullName || !mobileNumber || !addressLine1 || !pincode) {
                Alert.alert('Error', 'Please fill in all required fields');
                return;
            }
    
            // Retrieve existing user data from AsyncStorage
            const existingData = await AsyncStorage.getItem('userData');
            let dataArray = [];
    
            if (existingData !== null) {
                dataArray = JSON.parse(existingData);
    
                // Get the index of the user data you want to update
                const userIndex = 0; // Set the index based on your requirement
    
                // Find the index of the address within the addresses array
                const addressIndex = dataArray[userIndex].addresses.findIndex(
                    (address) => address.id === addressData.id 
                );
    
                if (addressIndex !== -1) {
                    dataArray[userIndex].addresses[addressIndex] = {
                        id: addressData.id, 
                        fullName,
                        mobileNumber,
                        addressLine1,
                        addressLine2,
                        landmark,
                        pincode,
                    };
    
                    // Update user data in AsyncStorage
                    await AsyncStorage.setItem('userData', JSON.stringify(dataArray));
    
                    Alert.alert('Success', 'Address updated successfully');
                    Navigation.replace('Address'); 
                } else {
                
                    Alert.alert('Error', 'Address not found');
                }
            } else {
                Alert.alert('Error', 'No user data found');
            }
        } catch (error) {
            console.error('Error updating address: ', error);
        }
    };
    

    return (
        <SafeAreaView>
            <ScrollView>
                {/* search bar */}
                <View style={styles.searchBar}>
                    <TouchableOpacity style={styles.searchInputContainer}>
                        <MagnifyingGlassIcon style={styles.searchIcon} size={25} color="black" />
                        <TextInput style={styles.searchInput} placeholder='Search Amazon.com' />
                    </TouchableOpacity>
                    <MicrophoneIcon size={30} color="black" style={styles.microphoneIcon} />
                </View>
                {/* Fill the  Address */}
                <KeyboardAvoidingView style={styles.container}>
                    <View className="border-0 bg-blue-200 rounded mb-5">
                        <Text className="text-2xl text-black font-bold text-center mb-2">Update Your Address</Text>
                    </View>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    <Text style={styles.label}>Mobile Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your mobile number"
                        keyboardType="phone-pad"
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                    />
                    <Text style={styles.label}>Address Line 1</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Flat, House No., Building, Company"
                        value={addressLine1}
                        onChangeText={setAddressLine1}
                    />
                    <Text style={styles.label}>Address Line 2</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Area, Street, Sector"
                        value={addressLine2}
                        onChangeText={setAddressLine2}
                    />
                    <Text style={styles.label}>Landmark</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your City Name Only"
                        value={landmark}
                        onChangeText={setLandmark}
                    />
                    <Text style={styles.label}>Pincode</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter pincode"
                        keyboardType="numeric"
                        value={pincode}
                        onChangeText={setPincode}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default EditAddressScreen

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00CED1',
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '70%',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
    },
    microphoneIcon: {
        marginLeft: 10,
    },
    container: {
        padding: 20,
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        color: '#000',
        fontWeight: 'bold',

    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
})