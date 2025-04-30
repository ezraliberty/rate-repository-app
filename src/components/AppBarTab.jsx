import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
    navButton: {
      margin: 5,
    },
  });

const AppBarTab = ({title, to}) => {
    return (
        <Pressable>
            <Link to={to}><Text color="navText" fontWeight="bold" style={styles.navButton}>{title}</Text></Link>
        </Pressable>
    )
}
 
export default AppBarTab;