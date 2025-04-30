import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
    dataContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
  });

const Counter = ({numberValue, countName}) => {
    if (numberValue > 999) {
        numberValue = Math.round(numberValue / 100) / 10 + "k";
    }
  return (
    <View style={styles.dataContainer}>
      <Text fontWeight="bold">{numberValue}</Text>
      <Text>{countName}</Text>
    </View>
  );
};

export default Counter;
