import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
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
  },
  button: {
    marginTop: 20
  },
  buttonText: {
    padding: 15
  }
});

const RepositoryItem = ({ item, showLink }) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
    url } = item;

  const handlePress = () => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.subContainer}>
        <Text>
          <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        </Text>
        <View style={styles.detailContainer}>
          <Text testID="fullName" fontWeight="bold">{fullName}</Text>
          <Text testID="description" color="textSecondary" style={styles.description}>{description}</Text>
          <Text testID="language" buttonStyle="primary">{language}</Text>
        </View>
      </View>
      <Counts
        style={styles.subContainer}
        item={{ stargazersCount, forksCount, reviewCount, ratingAverage }}
      />
      {
        showLink &&
        <Pressable style={styles.button} onPress={handlePress}>
          <Text buttonStyle="primary" style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      }

    </View>
  );
};

export default RepositoryItem;