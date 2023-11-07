import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { MagnifyingGlassIcon, MicrophoneIcon, ChevronDownIcon, PlusCircleIcon, ViewfinderCircleIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';




const SearchBar = ({user}) => {
   
    
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
            <View style={styles.addressContainer}>
                <MapPinIcon size={30} color="black" style={styles.mapPinIcon} />
                <TouchableOpacity onPress={toggleModal} >
                    <Text style={styles.addressText}>Deliver to Priyank - Bhopal 464221</Text>
                </TouchableOpacity>
                <ChevronDownIcon size={30} color="black" style={styles.chevronIcon} />
            </View>
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
                        <TouchableOpacity onPress={closeModalAndNavigate} className="w-44 h-44 m-5 pt-4  bg-gray-100 justify-center items-center border-2 border-gray-400">
                            <PlusCircleIcon size={60} color="gray" style={{ alignSelf: 'center', paddingTop: 5, }} />
                            <Text className="font-semibold text-lg text-blue-600 text-center">Add new delivery Address</Text>
                        </TouchableOpacity>
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