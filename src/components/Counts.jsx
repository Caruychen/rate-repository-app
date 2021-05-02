import React from 'react';
import { View } from 'react-native';
import CountItem from './CountItem';

const Counts = ({ style, item }) => {
  return (
    <View style={{...style, justifyContent: 'space-around'}}>
      <CountItem count={item.stargazersCount} text="Stars" />
      <CountItem count={item.forksCount} text="Forks" />
      <CountItem count={item.reviewCount} text="Reviews" />
      <CountItem count={item.ratingAverage} text="Rating" />
    </View>
  );
};

export default Counts;