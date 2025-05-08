import React from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import theme from "../theme";
import { useAuth } from "../contexts/authContext";

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
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5-30 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5-50 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Confirm Password is required")
});

const SignUp = () => {
  const { signUp, state } = useAuth();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
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
      {state.error && <Text style={{ color: "red", padding: 10 }}>{state.error}</Text>}
      {state.loading && <Text style={{ padding: 10 }}>Signing Up...</Text>}
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
            formik.touched.password &&
              formik.errors.password && { borderColor: "red" },
          ]}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          testID="PasswordInput"
          secureTextEntry
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
            formik.touched.confirmPassword &&
              formik.errors.confirmPassword && { borderColor: "red" },
          ]}
          placeholder="Confirm Password"
          value={formik.values.confirmpassword}
          onChangeText={formik.handleChange("confirmPassword")}
          testID="PasswordInput"
          secureTextEntry
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <Text style={styles.errorText} testID="confirmPasswordError">
            {formik.errors.confirmPassword}
          </Text>
        )}
      </View>

      <Pressable
        onPress={formik.handleSubmit}
        style={styles.button}
        testID="reviewButton"
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
