import { View, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import MainScreenAppBar from "../components/Shared/MainScreenAppBar";
import { useMainScreenStore } from "../context/MainScreenContext";
import { profile } from "../styles/profile";
import { Card, Text, Appbar } from "react-native-paper";
import Loading from "../components/Shared/Loading";
import { color } from "../constants/colors";
import { removeData } from "../lib/storage";
import { route } from "../constants/route";

export default function Profile({ navigation }) {
  const { isLoading, userData } = useMainScreenStore();
  const courses = userData ? userData.courses : [];
  const firstname = userData ? userData.firstname : "";
  const surname = userData ? userData.surname : "";
  const othername = userData ? userData.othername : "";
  const matno = userData ? userData.matno : "";

  const logoutUser = async () => {
    await removeData("user");
    navigation.replace(route.Home);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  if (isLoading) return <Loading />;
  return (
    <View>
      <MainScreenAppBar title={"Profile"}>
        <Appbar.Action
          icon="login"
          color={color.white}
          size={30}
          onPress={logoutUser}
        />
      </MainScreenAppBar>
      <ScrollView>
        <View style={profile.base}>
          <Text style={profile.name}>
            {surname} {firstname} {othername}
          </Text>
          <Text style={profile.matno}>{matno}</Text>
        </View>

        {/* <Text variant="titleLarge" style={profile.yourCourses}>
          Your Courses
        </Text> */}
        {courses.map((item) => (
          <View key={item.courseCode} style={{ flex: 1 }}>
            <Card style={profile.card}>
              <Card.Content>
                <Text variant="titleLarge" style={profile.cardTitle}>
                  {item.courseCode}
                </Text>
                <Text variant="bodyMedium" style={profile.cardText}>
                  {item.courseTitle}
                </Text>
              </Card.Content>
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
