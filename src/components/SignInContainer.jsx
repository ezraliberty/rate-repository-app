import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

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
    color: 'red',
    paddingTop: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: theme.colors.cardColor,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long'),
});

const SignInContainer = ({ onSubmit, error, loading }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container} testID="signInContainer">
      {error && <Text style={{ color: 'red', padding: 10 }}>{error}</Text>}
      {loading && <Text style={{ padding: 10 }}>Signing in...</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            formik.touched.username && formik.errors.username && { borderColor: 'red' },
          ]}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
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
            formik.touched.password && formik.errors.password && { borderColor: 'red' },
          ]}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
          testID="passwordInput"
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText} testID="passwordError">
            {formik.errors.password}
          </Text>
        )}
      </View>

      <Pressable onPress={formik.handleSubmit} style={styles.button} testID="signInButton">
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignInContainer;