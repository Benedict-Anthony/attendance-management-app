import { Pressable, ScrollView, View } from "react-native";
import React, { useLayoutEffect } from "react";
import MainScreenAppBar from "../components/Shared/MainScreenAppBar";
import { useMainScreenStore } from "../context/MainScreenContext";
import Loading from "../components/Shared/Loading";
import { Card, Text, Checkbox } from "react-native-paper";
import { lecture } from "../styles/lecture";
import { sortByWeekday } from "../lib/sortCourses";
import { getCurrentDay } from "../lib/getCurrentDay";
import { color } from "../constants/colors";
import { route } from "../constants/route";

export default function Lecture({ navigation }) {
  const { isLoading, userData } = useMainScreenStore();
  const courses = userData ? userData.courses : [];
  const firstname = userData ? userData.firstname : "";
  const surname = userData ? userData.surname : "";
  const othername = userData ? userData.othername : "";
  const matno = userData ? userData.matno : "";
  const name = `${surname} ${firstname} ${othername}`;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  if (isLoading) return <Loading />;
  return (
    <View>
      <MainScreenAppBar title={"Lecture"} />
      <View>
        <ScrollView style={lecture.base}>
          {courses.length > 0 &&
            sortByWeekday(courses).map((item) => (
              <Pressable
                key={item.courseCode}
                onPress={() =>
                  navigation.navigate(route.LectureDetails, {
                    name: item.day,
                    course: item,
                    fullName: name,
                    matno: matno,
                  })
                }
                touchSoundDisabled
              >
                <Card style={[lecture.card, lecture.todayClass]}>
                  <Card.Content>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text variant="titleLarge" style={lecture.cardTitle}>
                        {item.courseTitle}
                      </Text>
                      {getCurrentDay(item.day) && (
                        <Checkbox status={"checked"} color={color.primary} />
                      )}
                    </View>
                    <Text variant="bodyMedium" style={lecture.cardSubtitle}>
                      {item.courseCode}
                    </Text>
                    <Text variant="bodyMedium" style={lecture.cardDay}>
                      {item.day} {item.timeStart} - {item.timeEnd}
                    </Text>
                  </Card.Content>
                </Card>
              </Pressable>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}
