import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantsCard from './ResturantsCard';

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    paddingHorizontal: 4,
    backgroundColor : '#E5E7EB'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#000000',
    marginLeft : 10
  },
  descriptionText: {
    fontSize: 16,
    color: '#4A5568',
    paddingHorizontal: 4,
    marginLeft : 10
  },
  scrollView: {
    paddingTop: 4,
    paddingHorizontal: 15,
  },
});

const FeaturedRow = ({ id, title, description }) => {
  const diwaliOffer = require('../assets/BestOffers/DiwaliOffer.webp');
  const flat150 = require('../assets/BestOffers/Flat150off.webp');
  const get60 = require('../assets/BestOffers/Get60PercentOff.webp');
  const mealsOff = require('../assets/BestOffers/MealsOffer.webp');
  const matchDay = require('../assets/BestOffers/MatchDay.webp');

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <View>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
        <RestaurantsCard
          id={1}
          imgUrl={diwaliOffer}
          title="Diwali Offer"
          rating={4.5}
          genre="Chinese"
          address="DB city mall"
          short_description="This is a test description"
          dishes={[]}
          long={20}
          lat={36}
        />
        <RestaurantsCard
          id={1}
          imgUrl={matchDay}
          title="Match Day Offer"
          rating={4.5}
          genre="Chinese"
          address="DB city mall"
          short_description="This is a test description"
          dishes={[]}
          long={20}
          lat={36}
        />
        <RestaurantsCard
          id={1}
          imgUrl={get60}
          title="60% Off"
          rating={4.5}
          genre="Chinese"
          address="DB city mall"
          short_description="This is a test description"
          dishes={[]}
          long={20}
          lat={36}
        />
        <RestaurantsCard
          id={1}
          imgUrl={flat150}
          title="Flat 150 Off"
          rating={4.5}
          genre="Chinese"
          address="DB city mall"
          short_description="This is a test description"
          dishes={[]}
          long={20}
          lat={36}
        />
        <RestaurantsCard
          id={1}
          imgUrl={mealsOff}
          title="Meals Offer"
          rating={4.5}
          genre="Chinese"
          address="DB city mall"
          short_description="This is a test description"
          dishes={[]}
          long={20}
          lat={36}
        />
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
