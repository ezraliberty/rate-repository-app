import { Platform } from "react-native";

const Font = Platform.select({
  ios: {
    fontFamily: "Avenir",
  },
});

export default Font;