import { StyleSheet } from "react-native";

export const login = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: "start",
    alignItems: "start",
  },

  formGroup: {
    paddingHorizontal: 10,
    marginTop: 30,
  },

  loginButton: {
    marginTop: 20,
    borderRadius: 7,
    paddingVertical: 3,
  },

  showPassword: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 10,
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
