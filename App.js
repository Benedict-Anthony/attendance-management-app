import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { route } from "./constants/route";
import Login from "./screens/Login";
import SignIn from "./screens/SignIn";
import CreateProfile from "./screens/CreateProfile";
import MainScreen from "./screens/MainScreen";
import LectureDetails from "./screens/LectureDetails";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <PaperProvider>
        <SafeAreaView className="flex-1">
          <Stack.Navigator
            screenOptions={{
              animation: "fade",
            }}
          >
            <Stack.Screen
              name={route.Home}
              component={Home}
              initialParams={route.Home}
            />
            <Stack.Screen name={route.MainScreen} component={MainScreen} />
            <Stack.Screen name={route.Login} component={Login} />
            <Stack.Screen name={route.SignIn} component={SignIn} />
            <Stack.Screen
              name={route.CreateProfile}
              component={CreateProfile}
            />
            <Stack.Screen
              name={route.LectureDetails}
              component={LectureDetails}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
}
