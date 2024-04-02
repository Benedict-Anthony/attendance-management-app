import { View, Text } from "react-native";
import React from "react";

export default function Container({ children }) {
  return <View className="flex-1 px-10">{children}</View>;
}
