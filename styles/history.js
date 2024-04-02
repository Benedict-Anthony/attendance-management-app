import { Dimensions, StyleSheet } from "react-native";
import { color } from "../constants/colors";

export const history = StyleSheet.create({
  base: {
    // padding: 10,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 5,
  },

  cardTitle: {
    fontWeight: 700,
    color: color.primary,
    marginVertical: 3,
  },

  cardDay: {
    fontWeight: 500,
    color: color.primary,
    marginVertical: 3,
  },

  historyModal: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingTop: 50,
    paddingHorizontal: 10,
    height: 350,
    margin: "auto",
    backgroundColor: color.white,
    borderRadius: 10,
  },

  modalTitle: {
    fontWeight: 700,
    color: color.primary,
    marginVertical: 3,
    textAlign: "center",
  },
  modalsbubTitle: {
    fontWeight: 500,
    color: color.primary,
    marginVertical: 10,
    fontSize: 20,
  },

  modalBuuton: {
    position: "absolute",
    top: 10,
    right: 0,
  },
});
