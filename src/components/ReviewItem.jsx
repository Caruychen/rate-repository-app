import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import format from 'date-fns/format';

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row'
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: 'center'
  },
  rating: {
    textAlign: 'center',
  },
  reviewContent: {
    flex: 1,
    marginLeft: 15,
  },
  date: {
    lineHeight: 25,
    marginBottom: 5
  }
});


const ReviewItem = ({ item }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text color="primary" fontWeight="bold" fontSize="subheading" style={styles.rating}>{item.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight="bold" fontSize="subheading">{item.title}</Text>
        <Text style={styles.date} color="textSecondary">{format(new Date(item.createdAt), "dd.MM.yyyy")}</Text>
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;