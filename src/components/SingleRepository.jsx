// SingleRepository.js
import { View, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardColor,
    padding: 10,
  },
});

const SingleRepository = () => {
  const { repositoryId } = useParams();
  const { repository, loading, error } = useRepository(repositoryId);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <RepositoryItem repository={repository} showGitHubButton={true} />
    </View>
  );
};

export default SingleRepository;