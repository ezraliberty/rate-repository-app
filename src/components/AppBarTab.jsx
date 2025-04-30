import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = ({item}) => {
    return (
        <Pressable>
            <Text color="navText" fontWeight="bold">{item.title}</Text>
        </Pressable>
    )
}

export default AppBarTab;