import { Alert, StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MicrophoneIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddAdressScreen = () => {

    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [landmark, setLandmark] = useState('');
    const [pincode, setPincode] = useState('');


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
            console.log('Existing User Data:', dataArray);

            if (existingData !== null) {
                dataArray = JSON.parse(existingData);

                // Get the index of the user data you want to update
                const userIndex = 0; // Set the index based on your requirement

                // Create a new address object
                const newAddress = {
                    fullName,
                    mobileNumber,
                    addressLine1,
                    addressLine2,
                    landmark,
                    pincode,
                };

                // Add the new address to the user's addresses array
                dataArray[userIndex].addresses.push(newAddress);

                // Update user data in AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(dataArray));

                // Address added successfully, you can navigate back or show a success message
                Alert.alert('Success', 'Address added successfully');
                // Log the updated user data for verification
                console.log('Updated User Data:', dataArray);
            } else {
                // No user data found, handle accordingly
                Alert.alert('Error', 'No user data found');
            }
        } catch (error) {
            console.error('Error adding address: ', error);
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
                <View style={styles.container}>
                    <View className="border-0 bg-blue-200 rounded mb-5">
                        <Text className="text-2xl text-black font-bold text-center mb-2">Add New Address</Text>
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
                        placeholder="Area, Street, Sector, Village"
                        value={addressLine2}
                        onChangeText={setAddressLine2}
                    />
                    <Text style={styles.label}>Landmark</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter landmark if any"
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddAdressScreen

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