import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";
import { format } from "date-fns";
import theme from "../theme";

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
  reviewInfo: {
    flexDirection: "column",
    flex: 1,
  },
  username: {
    fontWeight: "bold",
  },
  dateText: {
    color: theme.colors.textSecondary,
  },
  reviewText: {
    flexShrink: 1,
    flexWrap: 'wrap',
    marginTop: 5,
  },
});

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
        <View style={styles.reviewInfo}>
          <Text style={styles.username}>{review.user.username}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;