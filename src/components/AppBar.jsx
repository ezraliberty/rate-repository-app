import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 200,
    backgroundColor: theme.colors.textPrimary,
  },
  // ...
});

const navigationItems = [{ title: "Repositories", key: "repositories" }];

const AppBar = () => {
  return <View style={styles.container}>{navigationItems.map((item)=> <AppBarTab key={item.key} item={item} />)}</View>;
};

export default AppBar;
