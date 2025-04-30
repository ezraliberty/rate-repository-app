import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
    textCol: {
        color: "#fff",
    }
})


const AppBarTab = ({item}) => {
    return (
        <Pressable>
            <Text>{item.title}</Text>
        </Pressable>
    )
}

export default AppBarTab;