import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { format } from "date-fns";
import theme from "../theme";
import { date } from "yup";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: "#fff",
    padding: 10,
  },
  reviewHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewRating: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  ratingText: {
    backgroundColor: "white",
    color: theme.colors.primary,
    borderRadius: 17,
    height: 34,
    width: 34,
    textAlign: "center",
    lineHeight: 34,
  },
  dateText: {
    color: theme.colors.textSecondary,
  },
  reviewDetails: {
    flexDirection: "column",
    flexWrap: "wrap",
    flex: 1,
  },
});

const RepositoryInfo = ({ repository }) => (
  <View style={{ marginBottom: 10 }}>
    <RepositoryItem repository={repository} showGitHubButton={true} />
  </View>
);

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.reviewHeading}>
        <View style={styles.reviewRating}>
          <Text fontWeight="bold" style={styles.ratingText}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewDetails}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={{ flexShrink: 1 }}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

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
