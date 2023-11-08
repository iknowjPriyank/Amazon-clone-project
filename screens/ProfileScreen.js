import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../components/SearchBar'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  return (
    <View>
      <SearchBar/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})