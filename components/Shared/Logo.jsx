import { View, Text, Image } from "react-native";
import React from "react";
const logo = require("../../assets/icons/logo.png");
export default function Logo() {
  return (
    <View>
      <Image source={logo} style={{ width: 50, height: 50 }} />
    </View>
  );
}
