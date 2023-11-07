import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoriesCard from './CategoriesCard'

const Categories = () => {
    const beauty = require('../assets/images/beauty.jpg')
    const mobile = require('../assets/images/phone.jpg')
    const cloths = require('../assets/images/clothing.jpg')
    const footwear = require('../assets/images/footwear.jpg')
    const jewellery = require('../assets/images/jewellery-and-luggage.jpg')
    const kitchen = require('../assets/images/kitchen.jpg')
    const laptop = require('../assets/images/laptop.jpg')
    const tools = require('../assets/images/tools.jpg')
    const watch = require('../assets/images/watch.jpg')
    const tv = require('../assets/images/tv--appliances.jpg')

  return (
    <ScrollView
    contentContainerStyle={{
        paddingHorizontal : 15,
        paddingTop : 10,
        backgroundColor : '#ffffff'
    }}
    horizontal
    showsHorizontalScrollIndicator={false}
    >
      {/* Categories card */}
      <CategoriesCard imgUrl={mobile} title="Mobiles"  />
      {/* Categories card */}
      <CategoriesCard imgUrl={beauty} title="Beauty Products"  />
      {/* Categories card */}
      <CategoriesCard  imgUrl={cloths} title="Clothes" />
      {/* Categories card */}
      <CategoriesCard imgUrl={footwear} title="Footwear" />
      {/* Categories card */}
      <CategoriesCard imgUrl={kitchen} title="Kitchen" />
      {/* Categories card */}
      <CategoriesCard imgUrl={jewellery} title="Jewellery and luggage" />
      {/* Categories card */}
      <CategoriesCard imgUrl={laptop} title="Laptops" />
      {/* Categories card */}
      <CategoriesCard imgUrl={tv} title="Tv and Appliances" />
      {/* Categories card */}
      <CategoriesCard imgUrl={watch} title="Watches" />
      {/* Categories card */}
      <CategoriesCard imgUrl={tools} title="Tools" />
    </ScrollView>
  )
}

export default Categories