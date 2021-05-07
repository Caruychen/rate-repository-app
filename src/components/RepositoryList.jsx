import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import ModalButton from './ModalButton';
import OrderRepositoryModal from './Modals/OrderRepositoryModal';
import { useHistory } from 'react-router';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => this.props.history.push(`/repository/${item.id}`)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  }

  renderHeader = () => {
    const props = this.props;
    return (<>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => props.setSearchQuery(query)}
        value={props.searchQuery}
      />
      <ModalButton
        setModalVisible={props.setModalVisible} label={props.orderByLabel}
      />
    </>);
  }

  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map(edge => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        renderItem={this.renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const history = useHistory();

  const [modalVisible, setModalVisible] = useState(false);
  const [orderPrinciple, setOrderPrincple] = useState(0);
  const principles = [
    { orderBy: 'CREATED_AT', orderDirection: 'DESC', label: "Latest repositories" },
    { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', label: "Highest rated repositories" },
    { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', label: "Lowest rated repositories" }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);

  const { repositories, fetchMore } = useRepositories({
    ...principles[orderPrinciple],
    searchKeyword,
    first: 8
  });
  
  const onEndReached = () => fetchMore();

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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onEndReached={onEndReached}
        history={history}
      />
    </View>
  );
};

export default RepositoryList;