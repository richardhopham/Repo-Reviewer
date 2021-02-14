import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryListItem from './RepositoryListItem';
import useRepositories from '../hooks/useRepositories';

import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;



export const RepositoryListContainer = ({ data }) => {
  const history = useHistory();
  const repositoryNodes = data 
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => 
        <TouchableOpacity onPress={() => history.push(`/${item.id}`)}>
          <RepositoryListItem item={item} id={item.id}/>
        </TouchableOpacity>
      }
      ListFooterComponent = {ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const { data } = useRepositories();
  return <RepositoryListContainer data={data} />
};

export default RepositoryList;