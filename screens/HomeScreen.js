import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Categories from '../components/Categories'
import ImageSlider from '../components/ImageSlider'
import TrendingDeals from '../components/TrendingDeals'
import TodaysDeals from '../components/TodaysDeals'
import SearchBar from '../components/SearchBar'
import DropDownComponent from '../components/DropDownComponent'



const HomeScreen = () => {


    return (
        <>
            <SafeAreaView className="flex-1 bg-white">
                <SearchBar />
                <ScrollView>
                    {/* Horizontal screen view  */}
                    <Categories />

                    {/* Slider Box  */}
                    <ImageSlider />

                    {/* Trending Deals */}
                    <TrendingDeals />
                    {/* We are giving Border */}
                    <Text style={{ height: 1, borderColor: 'gray', borderWidth: 2, marginTop: 15 }} />

                    {/* Today's Deals */}
                    <TodaysDeals />

                    {/* We are giving Border */}
                    <Text style={{ height: 1, borderColor: 'gray', borderWidth: 2, marginTop: 15 }} />

                    {/* DropDown */}
                    <DropDownComponent />
                </ScrollView>
            </SafeAreaView>
           
        </>


    )
}

export default HomeScreen

const styles = StyleSheet.create({})