import { View } from "react-native";
import React from "react";
import { color } from "../../constants/colors";
import MainScreenAppBar from "./MainScreenAppBar";
import { UIActivityIndicator } from "react-native-indicators";

export default function Loading() {
  return (
    <View style={{ flex: 1 }}>
      <MainScreenAppBar title={"Loading"} />
      <UIActivityIndicator
        animating={true}
        color={color.primary}
        size={40}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </View>
  );
}
