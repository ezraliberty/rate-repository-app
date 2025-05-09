import { View, StyleSheet, Image, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import Counter from "./Counter";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: theme.colors.cardColor,
    padding: 10,
  },
  logo: {
    width: 66,
    height: 58,
  },
  tag: {
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    borderRadius: 5,
    padding: 5,
    margin: 2,
  },
  tagText: {
    color: theme.colors.cardColor,
  },
  ratingsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  githubButtonText: {
    color: theme.colors.cardColor,
    textAlign: "center",
  },
});

const RepositoryItem = ({ repository, showGitHubButton = false }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.logo}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.infoContainer}>
          <Text fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text>{repository.description}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{repository.language}</Text>
          </View>
          <View style={styles.ratingsContainer}>
            <Counter numberValue={repository.stargazersCount} countName="Stars" />
            <Counter numberValue={repository.forksCount} countName="Forks" />
            <Counter numberValue={repository.reviewCount} countName="Reviews" />
            <Counter numberValue={repository.ratingAverage} countName="Rating" />
          </View>
          {showGitHubButton && repository.url && (
            <Pressable
              style={styles.githubButton}
              onPress={() => Linking.openURL(repository.url)}
            >
              <Text style={styles.githubButtonText}>Open in GitHub</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;