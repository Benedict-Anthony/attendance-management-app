import { StyleSheet } from "react-native";
import { color } from "../constants/colors";

export const createProfile = StyleSheet.create({
  base: {
    flex: 1,
    padding: 5,
  },

  title: {
    color: color.primary,
    fontWeight: "700",
    marginVertical: 15,
    paddingLeft: 9,
  },

  input: {
    paddingHorizontal: 10,
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
});
