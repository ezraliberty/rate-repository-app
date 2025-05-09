import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryInfo = ({ repository }) => (
  <View style={{ marginBottom: 10 }}>
    <RepositoryItem repository={repository} showGitHubButton={true} />
  </View>
);

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { repositoryId } = useParams();
  const { repository, reviews, loading, error } = useRepository(repositoryId);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={reviews?.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;
// import { View, StyleSheet } from "react-native";
// import { useParams } from "react-router-native";
// import useRepository from "../hooks/useRepository";
// import RepositoryItem from "./RepositoryItem";
// import Text from "./Text";
// import theme from "../theme";

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: theme.colors.cardColor,
//     padding: 10,
//   },
// });

// const SingleRepository = () => {
//   const { repositoryId } = useParams();
//   const { repository, loading, error } = useRepository(repositoryId);

//   if (loading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error: {error.message}</Text>;

//   return (
//     <View style={styles.container}>
//       <RepositoryItem repository={repository} showGitHubButton={true} />
//     </View>
//   );
// };

// export default SingleRepository;
