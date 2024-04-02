import { Dimensions, StyleSheet } from "react-native";

export const home = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  homeImage: {
    width: 250,
    height: 250,
  },

  homeCard: {
    width: Dimensions.get("screen").width - 20,
    marginVertical: 10,
  },

  homeButton: {
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 5,
    gap: 20,
    flex: 1,
    paddingVertical: 5,
    width: Dimensions.get("screen").width - 20,
  },
});
