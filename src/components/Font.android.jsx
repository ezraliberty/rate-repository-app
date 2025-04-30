import { Platform } from "react-native";

const Font = Platform.select({
  android: {
    fontFamily: "Roboto",
  },
});

export default Font;