import React from 'react';
import { View } from 'react-native';
import CountItem from './CountItem';

const Counts = ({ style, item }) => {
  return (
    <View style={{...style, justifyContent: 'space-around'}}>
      <CountItem testID="stargazersCount" count={item.stargazersCount} text="Stars" />
      <CountItem testID="forksCount" count={item.forksCount} text="Forks" />
      <CountItem testID="reviewCount" count={item.reviewCount} text="Reviews" />
      <CountItem testID="ratingAverage" count={item.ratingAverage} text="Rating" />
    </View>
  );
};

export default Counts;