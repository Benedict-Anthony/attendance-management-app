import { StyleSheet } from "react-native";
import { color } from "../constants/colors";

export const timetabale = StyleSheet.create({
  base: {
    paddingTop: 10,
  },
  timetableTitle: {
    fontWeight: "700",
    fontSize: 20,
    color: color.primary,
    textAlign: "center",
  },
  timetabaleCard: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
