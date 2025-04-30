import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: theme.colors.cardColor,
  },
  logo: {
    width: 66,
    height: 58,
  },
  tag: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.cardColor,
    alignSelf: "flex-start",
    padding: 5,
  },
  ratingsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  dataContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingsContainer}>
        <View>
          <Image
            style={styles.logo}
            source={{ uri: repository.ownerAvatarUrl }}
          />
        </View>
        <View>
          <Text fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text>{repository.description}</Text>
          <Text style={styles.tag}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.ratingsContainer}>
        <View style={styles.dataContainer}>
          <Text>{repository.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text>{repository.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text>{repository.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text>{repository.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
