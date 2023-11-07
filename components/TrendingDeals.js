import { View, Text, TouchableOpacity, Image, } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { deals } from './database';

const TrendingDeals = () => {
     const Navigation = useNavigation() ;
   

    return (
        <View className="ml-2">
            <Text className="font-bold text-xl text-black">Trending Products of the week</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent : 'center' }}>
                {deals.map((item, index) => (
                    <TouchableOpacity
                    style={{marginVertical : 10, alignItems :'center', flexWrap : 'wrap'}}
                        key={item.id}
                        onPress={() =>
                            Navigation.navigate('Info', {
                                id: item.id,
                                title: item.title,
                                image : item.image,
                                offer : item.offer,
                                price: item?.price,
                                carouselImages: item.carouselImages,
                                color: item?.color,
                                size: item?.size,
                                oldPrice: item?.oldPrice,
                                item: item,
                            })
                        }
                        
                    >
                        <Image style={{ width: 180, height: 180, resizeMode: 'contain' }} source={{ uri: item?.image }} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>

    )
}

export default TrendingDeals