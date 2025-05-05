import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useAuth } from "../contexts/authContext";

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
