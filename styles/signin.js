import { StyleSheet } from "react-native";
import { color } from "../constants/colors";

export const signin = StyleSheet.create({
  base: {
    flex: 1,
    padding: 3,
  },

  title: {
    color: color.primary,
    fontWeight: "700",
    marginVertical: 15,
    paddingLeft: 6,
  },

  input: {
    paddingHorizontal: 5,
    marginVertical: 10,
  },

  buttonContainer: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 3,
  },

  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
