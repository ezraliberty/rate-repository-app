import React from "react";
import { View } from "react-native";
import SignInContainer from "./SignInContainer";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-native";

const SignIn = () => {
  const { signIn, state } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await signIn({ username, password });
    if (!state.error && !state.loading && state.isAuthenticated) {
      navigate("/");
    }
  };

  return (
    <View>
      <SignInContainer
        onSubmit={onSubmit}
        error={state.error}
        loading={state.loading}
      />
    </View>
  );
};

export default SignIn;
