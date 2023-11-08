import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { MagnifyingGlassIcon, MicrophoneIcon, ChevronDownIcon, PlusCircleIcon, ViewfinderCircleIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';



// Fetching the Address data
const fetchAddresses = async (setAddresses) => {
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


const SearchBar = () => {

     
    const Navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const insets = useSafeAreaInsets();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    const closeModalAndNavigate = () => {
        setModalVisible(false);
        Navigation.navigate('Address')
    };

    
    // Fetching Address data from Local storage
    const [addresses, setAddresses] = useState([]);

    // Call fetchAddresses whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchAddresses(setAddresses);
    }, [])
  );

     // Setting the same landmart and pincode user selected 
    const [selectedAddress, setSelectedAddress] = useState("") 
    useEffect(() => {
        if (selectedAddress) {
            closeModal();
        }
    }, [selectedAddress]);
    
    const handleClickOnAddress = (item) => {
        toggleModal();
        setSelectedAddress(item);
    };
    
   

    return (
        <View>
            {/* search bar */}
            <View style={styles.searchBar}>
                <TouchableOpacity style={styles.searchInputContainer}>
                    <MagnifyingGlassIcon style={styles.searchIcon} size={25} color="black" />
                    <TextInput style={styles.searchInput} placeholder='Search Amazon.com' />
                </TouchableOpacity>
                <MicrophoneIcon size={30} color="black" style={styles.microphoneIcon} />
            </View>
            {/* Address */}
            <TouchableOpacity onPress={toggleModal} style={styles.addressContainer}>
                <MapPinIcon size={30} color="black" style={styles.mapPinIcon} />
                {selectedAddress ? (
                    <TouchableOpacity onPress={toggleModal}>
                        <Text className="font-500 text-black text-base">Deliver to {selectedAddress?.landmark} - {selectedAddress?.pincode}</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={toggleModal}>
                    <Text>Select Your Address</Text>
                </TouchableOpacity>
                )}
                <ChevronDownIcon onPress={toggleModal} size={30} color="black" style={styles.chevronIcon} />
            </TouchableOpacity>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={closeModal}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                    marginBottom: insets.bottom,
                }}
                backdropOpacity={0}
                backdropColor="transparent"
            >
                <View className="bg-white w-screen h-96">
                    <View>
                        <Text className="mt-3 font-semibold pl-4 text-xl text-black">Choose Your location</Text>
                        <Text className="px-4 text-xm text-gray-700">Select Delivery Location to see product availiblity and delivery options.</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {/* Add new Delivery Address box */}
                        <TouchableOpacity onPress={closeModalAndNavigate} className="w-44 h-44 m-3 pt-4  bg-gray-100 justify-center items-center border-2 rounded-md border-gray-300">
                            <PlusCircleIcon size={60} color="gray" style={{ alignSelf: 'center', paddingTop: 5, }} />
                            <Text className="font-semibold text-lg text-blue-600 text-center">Add new delivery Address</Text>
                        </TouchableOpacity>
                        {/* Already Added addresses */}
                        {addresses?.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handleClickOnAddress(item)} className="w-44 h-44 m-3 bg-gray-100 justify-center border-2 border-gray-300 rounded-md" style={{ backgroundColor : selectedAddress == item ? "#FBCEB1" : '#FFF' }}>
                                <View className="flex-row">
                                    <Text className="text-xl font-bold mb-2 pl-1">{item?.fullName}</Text>
                                    <MapPinIcon size={24} color="red" />
                                </View>
                                <Text style={styles.addressText}>{item?.landmark}</Text>
                                <Text style={styles.addressText}>{item?.addressLine1}, {item?.addressLine2}</Text>
                                <Text style={styles.addressText}>{item.mobileNumber}</Text>
                                <Text style={styles.addressText}>{item.pincode}</Text>
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                    {/* Enter Your Pincode */}
                    <TouchableOpacity className="flex-row px-4 text-xm space-x-1">
                        <MapPinIcon size={30} color="black" />
                        <Text className="text-blue-600 text-lg font-semibold">Enter Your Pincode</Text>
                    </TouchableOpacity>
                    {/* Use my current location */}
                    <TouchableOpacity className="flex-row px-4 mb-4 mt-1 space-x-1">
                        <ViewfinderCircleIcon size={30} color="black" />
                        <Text className="text-blue-600 text-lg">Use my current Address</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    )
}

export default SearchBar

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
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#AFEEEE',
    },
    mapPinIcon: {
        marginLeft: 10,
    },
    addressText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 5,
    },
    chevronIcon: {
        marginLeft: 5,
    },
})