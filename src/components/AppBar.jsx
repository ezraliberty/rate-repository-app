import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
// import useAuth from "../hooks/useAuth";
import { useAuth } from "../contexts/authContext";
import Text from "./Text";
// import useSignOut from "../hooks/useSignOut";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    height: 100,
    backgroundColor: theme.colors.textPrimary,
    justifyContent: "flex-start",
    padding: 10,
    gap: 10,
  },
});

const AppBar = () => {
  const { state, signOut } = useAuth();

  // if (state.loading) {
  //   return <Text>Loading user data...</Text>;
  // }

  // if (state.error) {
  //   return <Text>Error: {state.error}</Text>;
  // }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" to="/" />
        {state.isAuthenticated && state.user ? (
          <AppBarTab title="Sign out" onPress={signOut} />
        ) : (
          <AppBarTab title="Sign in" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
