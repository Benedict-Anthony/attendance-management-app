import React, { useLayoutEffect } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TimeTable from "./TimeTable";
import { route } from "../constants/route";
import Lecture from "./Lecture";
import Profile from "./Profile";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { color } from "../constants/colors";
import { View } from "react-native";
import { MainScreenProvider } from "../context/MainScreenContext";
import History from "./History";
const Tab = createBottomTabNavigator();

export default function MainScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <MainScreenProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: color.white,
          tabBarInactiveTintColor: color.gray,
          tabBarActiveBackgroundColor: color.darkPrimary,
          tabBarBackground: () => (
            <View
              style={{
                backgroundColor: color.primary,
                flex: 1,
                paddingVertical: 20,
              }}
            ></View>
          ),
        }}
      >
        <Tab.Screen
          name={route.Lectures}
          component={Lecture}
          options={{
            tabBarIcon: () => (
              <Foundation
                name="clipboard-notes"
                size={27}
                color={color.white}
              />
            ),
          }}
        />
        <Tab.Screen
          name={route.Timetable}
          component={TimeTable}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="timetable"
                size={27}
                color={color.white}
              />
            ),
          }}
        />
        <Tab.Screen
          name={route.Profile}
          component={Profile}
          options={{
            title: "You",
            tabBarIcon: () => (
              <AntDesign name="user" size={27} color={color.white} />
            ),
          }}
        />
        <Tab.Screen
          name={route.History}
          component={History}
          options={{
            title: "History",
            tabBarIcon: () => (
              <FontAwesome5 name="history" size={27} color={color.white} />
            ),
          }}
        />
      </Tab.Navigator>
    </MainScreenProvider>
  );
}
