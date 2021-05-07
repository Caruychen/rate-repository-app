import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  headerContainer: {
    marginBottom: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository({ id, first: 7 });
  const reviews = repository
    ? repository.reviews.edges.map(edge => ({ ...edge.node, title: edge.node.user.username }))
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