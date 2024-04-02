import { StyleSheet } from "react-native";
import { color } from "../constants/colors";

export const lecture = StyleSheet.create({
  base: {
    padding: 10,
    marginBottom: 30,
  },

  card: {
    marginHorizontal: 2,
    marginVertical: 10,
  },
  cardTitle: {
    color: color.primary,
    marginVertical: 5,
    fontWeight: "700",
    textTransform: "capitalize",
    fontSize: 20,
  },

  cardSubtitle: {
    marginVertical: 3,
    fontSize: 17,
    fontWeight: "normal",
  },
  cardDay: {
    marginTop: 3,
    fontSize: 17,
    fontWeight: "normal",
  },

  todayClass: {
    borderColor: color.riplePrimary,
  },
  checkBox: {
    borderRadius: 50,
  },
});
