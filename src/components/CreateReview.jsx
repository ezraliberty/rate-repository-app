import React from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import theme from "../theme";
import useReviews from "../hooks/useReviews";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.cardColor,
  },
  inputContainer: {
    margin: 10,
  },
  textInput: {
    height: 50,
    borderColor: theme.colors.textPrimary,
    borderWidth: 1,
    padding: 10,
  },
  errorText: {
    color: "red",
    paddingTop: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: theme.colors.cardColor,
  },
});

const initialValues = {
  username: "",
  repositoryName: "",
  rating: "",
  review: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  repositoryName: yup
    .string()
    .required("Repository Name is required")
    .min(5, "Repository Name must be at least 5 characters long"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(5, "Rating must be between 0 - 100"),
  review: yup.string().min(5, "Review must be at least 5 characters long"),
});

const CreateReview = () => {
  const { newReview, loading, error } = useReviews();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, repositoryName, rating, review } = values;
    try {
      const addedReviewData = await newReview({
        ownerName: username,
        repositoryName,
        rating: Number(rating),
        text: review,
      });
      if (addedReviewData && addedReviewData.repositoryId) {
        alert(
          `Review "${addedReviewData.text}" successfully added to ${addedReviewData.repository.name}`
        );
        navigate(`/${addedReviewData.repositoryId}`);
      }
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container} testID="ReviewContainer">
      {error && <Text style={{ color: "red", padding: 10 }}>{error}</Text>}
      {loading && <Text style={{ padding: 10 }}>Creating Review...</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            formik.touched.username &&
              formik.errors.username && { borderColor: "red" },
          ]}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          testID="usernameInput"
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.errorText} testID="usernameError">
            {formik.errors.username}
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            formik.touched.repositoryName &&
              formik.errors.repositoryName && { borderColor: "red" },
          ]}
          placeholder="Repository Name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange("repositoryName")}
          testID="RepositoryInput"
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText} testID="passwordError">
            {formik.errors.password}
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            formik.touched.rating &&
              formik.errors.rating && { borderColor: "red" },
          ]}
          placeholder="Rating"
          value={formik.values.rating}
          onChangeText={formik.handleChange("rating")}
          testID="ratingInput"
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={styles.errorText} testID="ratingError">
            {formik.errors.rating}
          </Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            formik.touched.review &&
              formik.errors.review && { borderColor: "red" },
          ]}
          placeholder="Review"
          value={formik.values.review}
          onChangeText={formik.handleChange("review")}
          testID="reviewInput"
        />
        {formik.touched.review && formik.errors.review && (
          <Text style={styles.errorText} testID="reviewError" multiline>
            {formik.errors.review}
          </Text>
        )}
      </View>

      <Pressable
        onPress={formik.handleSubmit}
        style={styles.button}
        testID="reviewButton"
      >
        <Text style={styles.buttonText}>Create Review</Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;
