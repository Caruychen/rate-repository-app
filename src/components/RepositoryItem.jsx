import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import Counts from './Counts';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20
  },
  subContainer: {
    flexDirection: 'row',
  },
  detailContainer: {
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    flex: 1
  },
  description: {
    marginVertical: 10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5
  }
});

const RepositoryItem = ({ item }) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl } = item;
  return (
    <View style={styles.itemContainer}>
      <View style={styles.subContainer}>
        <Text>
          <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        </Text>
        <View style={styles.detailContainer}>
          <Text fontWeight="bold">{fullName}</Text>
          <Text color="textSecondary" style={styles.description}>{description}</Text>
          <Text buttonStyle="primary">{language}</Text>
        </View>
      </View>
      <Counts
        style={styles.subContainer}
        item={{ stargazersCount, forksCount, reviewCount, ratingAverage }}
      />
    </View>
  );
};

export default RepositoryItem;