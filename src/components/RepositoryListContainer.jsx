import React from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import Filter from "./FIlter";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    const onChangeSearch = (query) => props.setSearchQuery(query);

    return (
      <>
        <Filter
          sort={props.sort}
          onSortChange={props.onSortChange}
          searchQuery={props.searchQuery}
          onTextChange={onChangeSearch}
        />
      </>
    );
  };

  render() {
    const props = this.props;
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => props.navigate(`/${item.id}`)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryListContainerWithNavigation = (props) => {
  const navigate = useNavigate();
  return <RepositoryListContainer {...props} navigate={navigate} />;
};

export default RepositoryListContainerWithNavigation;