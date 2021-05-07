import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router';
import format from 'date-fns/format';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  headerContainer: {
    marginBottom: 10
  },
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

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ item }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text color="primary" fontWeight="bold" fontSize="subheading" style={styles.rating}>{item.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight="bold" fontSize="subheading">{item.user.username}</Text>
        <Text style={styles.date} color="textSecondary">{format(new Date(item.createdAt), "dd.MM.yyyy")}</Text>
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
    </View>
  );
};

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository({ id, first: 5 });
  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  if (loading) return null;
  return (
    <FlatList
      data={reviews}
      renderItem={ReviewItem}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} showLink="true" style={styles.headerContainer} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={() => fetchMore()}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryView;