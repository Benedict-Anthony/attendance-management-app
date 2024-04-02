import { StyleSheet } from "react-native";
import { color } from "../constants/colors";

export const profile = StyleSheet.create({
  base: {
    padding: 10,
  },

  name: {
    fontSize: 35,
    fontWeight: "700",
    marginVertical: 15,
    color: color.primary,
    textAlign: "center",
  },
  matno: {
    fontSize: 20,
    color: color.primary,
    textAlign: "center",
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
  yourCourses: {
    marginHorizontal: 10,
    fontSize: 22,
    marginTop: 10,
    color: color.darkPrimary,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 10,
    flex: 1,
  },

  cardTitle: {
    fontSize: 23,
    fontWeight: "600",
    color: color.primary,
    marginBottom: 3,
  },

  cardText: {
    fontSize: 17,
  },
});
