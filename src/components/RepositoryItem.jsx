import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";
import Counter from "./Counter";

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
    alignSelf: "flex-start",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 5,
  },
  tagText: {
    color: theme.colors.cardColor,
  },
  ratingsContainer: {
    flexDirection: "row",
    gap: 20,
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
          <View style={styles.tag}>
            <Text style={styles.tagText}>{repository.language}</Text>
          </View>
          <View style={styles.ratingsContainer}>
            <Counter numberValue={repository.stargazersCount} countName={"Stars"} />
            <Counter numberValue={repository.forksCount} countName={"Forks"} />
            <Counter numberValue={repository.reviewCount} countName={"Reviews"} />
            <Counter numberValue={repository.ratingAverage} countName={"Rating"} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
