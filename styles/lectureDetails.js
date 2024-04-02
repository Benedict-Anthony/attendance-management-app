import { Dimensions, StyleSheet } from "react-native";
import { color } from "../constants/colors";

export const lectureDetails = StyleSheet.create({
  baseContainer: {},
  base: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },

  card: {
    width: Dimensions.get("screen").width - 15,
    marginTop: 30,
    position: "absolute",
  },

  cardTitle: {
    fontWeight: "700",
    color: color.primary,
    marginVertical: 20,
    textTransform: "capitalize",
    lineHeight: 30,
  },

  cardTitleCode: {
    fontWeight: "700",
    color: color.primary,
    marginVertical: 20,
    textTransform: "uppercase",
  },

  cardDay: {
    fontSize: 17,
    color: color.dark,
    marginTop: 10,
  },

  cardButton: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 8,
    fontWeight: "700",
  },

  cardSessionActions: {
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 50,
  },

  pulse: {
    position: "absolute",
    top: 0,
    right: 0,
  },

  progress: {
    marginTop: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  progressText: {
    marginTop: 40,
    fontSize: 17,
    color: color.primary,
    fontWeight: "700",
  },
});
