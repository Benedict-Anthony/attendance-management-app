import { Dimensions, StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  base: {
    backgroundColor: "white",
    flex: 1,
  },

  containerStyle: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 10,
    height: Dimensions.get("screen").height - 350,
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  button: {
    marginTop: 50,
    textAlign: "center",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
