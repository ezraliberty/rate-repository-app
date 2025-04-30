// import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgColor,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Text fontWeight="bold">Rate Repository Application</Text>
      <RepositoryList/>
    </View>
  );
};

export default Main;