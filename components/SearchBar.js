import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React from 'react'
import { MagnifyingGlassIcon, MicrophoneIcon, MapPinIcon, ChevronDownIcon } from 'react-native-heroicons/outline'

const SearchBar = () => {
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
                <Pressable>
                    <Text style={styles.addressText}>Deliver to Priyank - Bhopal 464221</Text>
                </Pressable>
                <ChevronDownIcon size={30} color="black" style={styles.chevronIcon} />
            </View>
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