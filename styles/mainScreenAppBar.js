import { StyleSheet } from "react-native";
import { color } from "../constants/colors";

export const mainscreenappbar = StyleSheet.create({
  base: {
    height: 40,
    paddingBottom: 10,
    backgroundColor: color.primary,
  },
  title: {
    color: color.white,
    fontSize: 40,
    fontWeight: 700,
  },
});
