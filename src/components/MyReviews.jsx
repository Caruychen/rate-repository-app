import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { authorizedUser, loading, fetchMore } = useAuthorizedUser({ first: 7, includeReviews: true });
  const reviews = authorizedUser
    ? authorizedUser.reviews.edges.map(edge => ({ ...edge.node, title: edge.node.repository.fullName }))
    : [];

  if (loading) return null;
  return (
    <FlatList
      data={reviews}
      renderItem={ReviewItem}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={() => fetchMore()}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MyReviews;