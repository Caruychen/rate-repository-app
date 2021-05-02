import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40
  }
});

const CountItem = ({ count, text }) => {
  const formattedCount = count < 1000 ? count : Math.round(count / 100) / 10 + 'k';
  return (
    <View style={styles.container}>
      <Text fontWeight="bold">{formattedCount}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

export default CountItem;