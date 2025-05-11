import { useEffect } from "react";
import ReviewItem from "./ReviewItem";
import { useAuth } from "../contexts/authContext";
import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import useReviews from "../hooks/useReviews";
import { useNavigate } from "react-router-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardColor,
  },
  separator: {
    height: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors.cardColor,
    textAlign: "center",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItemData = ({ review, fetchUser }) => {
  const { deleteReview } = useReviews();
  const navigate = useNavigate();

  const toggleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteReview(review.id);
              fetchUser(true);
            } catch (err) {
              console.error("Error deleting review:", err);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ReviewItem review={review} />
      <View style={{flexDirection: "row", gap: 10, justifyContent: "center", marginBottom: 10}}>
        <Pressable
          style={styles.button}
          onPress={() => navigate(`/${review.repositoryId}`)}
        >
          <Text style={styles.buttonText}>View Repository</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={toggleDelete}
        >
          <Text style={styles.buttonText}>Delete Review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Reviews = () => {
  const { state, fetchUser } = useAuth();
  const { user, loading, error } = state;

  useEffect(() => {
    if (!user || !user.reviews) {
      fetchUser(true);
    }
  }, []);

  if (loading) {
    return <Text>Loading reviews...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!user || !user.reviews?.edges?.length) {
    return <Text>No reviews found.</Text>;
  }

  return (
    <View>
      <FlatList
        data={user.reviews.edges.map((edge) => edge.node)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReviewItemData review={item} fetchUser={fetchUser} />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default Reviews;
