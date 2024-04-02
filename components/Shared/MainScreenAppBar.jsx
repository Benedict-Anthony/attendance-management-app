import React from "react";
import { Appbar } from "react-native-paper";
import { mainscreenappbar } from "../../styles/mainScreenAppBar";
import { color } from "../../constants/colors";

export default function MainScreenAppBar({ title, children }) {
  return (
    <Appbar.Header style={mainscreenappbar.base}>
      <Appbar.Content
        title={title}
        style={mainscreenappbar.title}
        color={color.white}
      />
      <Appbar.Action icon="calendar-week" color={color.gray} size={40} />
      {children}
    </Appbar.Header>
  );
}
