import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import useDeleteReview from '../hooks/useDeleteReview';
import ReviewItem from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    paddingBottom: 20
  },
  buttonText: {
    paddingVertical: 15,
    paddingHorizontal: 30
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();
  const { authorizedUser, fetchMore, refetch } = useAuthorizedUser({ first: 7, includeReviews: true });
  const reviews = authorizedUser
    ? authorizedUser.reviews.edges.map(edge => ({ ...edge.node, title: edge.node.repository.fullName }))
    : [];

  const handleDelete = async (id) => {
    await deleteReview(id);
    refetch();
  };

  const RenderItem = ({ item }) => {

    const deleteAlert = () => {
      Alert.alert(
        "Delete review",
        "Are you sure you want to delete this review?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK", onPress: () => handleDelete(item.id) }
        ]
      );
    };

    return (
      <View>
        <ReviewItem item={item} />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => history.push(`/repository/${item.repository.id}`)}>
            <Text fontSize="subheading" fontWeight="bold" buttonStyle="primary" style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={deleteAlert}>
            <Text fontSize="subheading" fontWeight="bold" buttonStyle="danger" style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={RenderItem}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={() => fetchMore()}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MyReviews;