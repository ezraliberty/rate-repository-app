import React from 'react';
import { View, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { format } from 'date-fns';

const RepositoryInfo = ({ repository }) => (
  <View>
    <RepositoryItem repository={repository} showGitHubButton={true} />
  </View>
);

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View>
      <View>
        <View>
          <Text>{review.rating}</Text>
        </View>
        <View>
          <Text>{review.user.username}</Text>
          <Text>{formattedDate}</Text>
        </View>
      </View>
      <Text>{review.text}</Text>
    </View>
  );
};

const ItemSeparator = () => <View />; // Basic separator

const SingleRepository = () => {
  const { repositoryId } = useParams();
  const { repository, reviews, loading, error } = useRepository(repositoryId);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={reviews?.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
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