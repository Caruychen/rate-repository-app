import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import ModalButton from './ModalButton';
import OrderRepositoryModal from './Modals/OrderRepositoryModal';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, setModalVisible, orderByLabel }) => {
  const history = useHistory();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => history.push(`/repository/${item.id}`)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={() => <ModalButton
        setModalVisible={setModalVisible} label={orderByLabel} />}
    />
  );
};

const RepositoryList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderPrinciple, setOrderPrincple] = useState(0);
  const principles = [
    { orderBy: 'CREATED_AT', orderDirection: 'DESC', label: "Latest repositories" },
    { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', label: "Highest rated repositories" },
    { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', label: "Lowest rated repositories" }
  ];
  const { repositories } = useRepositories(principles[orderPrinciple]);
  return (
    <View>
      <OrderRepositoryModal
        visibility={modalVisible}
        setModalVisible={setModalVisible}
        orderPrinciple={orderPrinciple}
        setOrderPrincple={setOrderPrincple}
        principles={principles}
      />
      <RepositoryListContainer
        repositories={repositories}
        setModalVisible={setModalVisible}
        orderByLabel={principles[orderPrinciple].label}
      />
    </View>
  );
};

export default RepositoryList;