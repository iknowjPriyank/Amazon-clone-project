import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, {useState} from 'react'
import { MicrophoneIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'

const AddAdressScreen = () => {

    const [addresses, setAddresses] = useState([]);
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
                {/* All the Address */}
                
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
})