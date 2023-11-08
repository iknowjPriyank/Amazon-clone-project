import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDoubleRightIcon, MagnifyingGlassIcon, MapPinIcon, MicrophoneIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressScreen = () => {
    const Navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data) {
                    const userDataArray = JSON.parse(data);
                    const addressesArray = userDataArray.map(user => user.addresses).flat();
                    setAddresses(addressesArray);
                }
            } catch (error) {
                console.error('Error fetching addresses: ', error);
            }
        };

        fetchAddresses();
    }, []);


const handleDeleteAddress = async (index) => {
    try {
        // Retrieve addresses array from AsyncStorage
        const data = await AsyncStorage.getItem('userData');
        if (data) {
            const userDataArray = JSON.parse(data);
            
            // Remove the address at the specified index
            userDataArray.forEach(user => {
                user.addresses.splice(index, 1);
            });

            // Update AsyncStorage with the modified addresses array
            await AsyncStorage.setItem('userData', JSON.stringify(userDataArray));

            // Update the state with the modified addresses array
            const addressesArray = userDataArray.map(user => user.addresses).flat();
            setAddresses(addressesArray);

            console.log('Address deleted successfully.');
        }
    } catch (error) {
        console.error('Error deleting address: ', error);
    }
};


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* search bar */}
                <View style={styles.searchBar}>
                    <View style={styles.searchInputContainer}>
                        <MagnifyingGlassIcon style={styles.searchIcon} size={25} color="black" />
                        <TextInput style={styles.searchInput} placeholder='Search Amazon.com' />
                    </View>
                    <MicrophoneIcon size={30} color="black" style={styles.microphoneIcon} />
                </View>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Your Addresses</Text>
                    <Pressable onPress={() => Navigation.navigate('AddAddress')} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add a New Address</Text>
                        <ChevronDoubleRightIcon size={30} color="black" />
                    </Pressable>
                </View>
                {/* all the added addresses */}
                {addresses?.map((item, index) => (
                    <Pressable key={index} style={styles.addressBox}>
                        <View style={styles.addressRow}>
                            <Text style={styles.fullName}>Name :- {item?.fullName}</Text>
                            <MapPinIcon size={24} color="red" />
                        </View>
                        <Text style={styles.addressText}>Address :- {item?.landmark}</Text>
                        <Text style={styles.addressText}>{item?.addressLine1}, {item?.addressLine2}</Text>
                        <Text style={styles.addressText}>Phone No: {item.mobileNumber}</Text>
                        <Text style={styles.addressText}>Pin Code: {item.pincode}</Text>
                        <View style={styles.buttonContainer}>
                            <Pressable style={styles.button}>
                                <Text  style={styles.buttonText} onPress={() => Navigation.navigate('Edit', { addressData: item })}>Edit</Text>
                            </Pressable>
                            <Pressable onPress={handleDeleteAddress} style={styles.button}>
                                <Text  style={styles.buttonText}>Remove</Text>
                            </Pressable>
                            <Pressable style={styles.button}>
                                <Text style={styles.buttonText} >Set as Default</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    headingContainer: {
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#D0D0D0',
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color : 'black',
        padding : 5,
        paddingLeft : 10
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'space-between',
        borderWidth : 1,
        padding : 5,
        borderLeftColor : 0,
        borderRightColor : 0,
        width : '95%',
        alignSelf : 'center',

    },
    addButtonText: {
        fontSize: 18,
        marginRight: 10,
        color : 'black',
    },
    addressBox: {
        borderWidth: 2,
        borderColor: '#D0D0D0',
        padding: 10,
        marginVertical: 10,
        width : '95%',
        alignSelf : 'center',
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    fullName: {
        fontSize: 20,
        fontWeight : '400',
        color : '#000'
    },
    addressText: {
        fontSize: 15,
        color: '#181818',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 7,
    },
    button: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#D0D0D0',
    },
    buttonText : {
        fontWeight : 'bold',
        
    }
});

export default AddressScreen;
