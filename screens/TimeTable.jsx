import { View, Text, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import MainScreenAppBar from "../components/Shared/MainScreenAppBar";
import { DataTable, Card } from "react-native-paper";
import { useMainScreenStore } from "../context/MainScreenContext";
import { sortByWeekday } from "../lib/sortCourses";
import { timetabale } from "../styles/timetable";
import Loading from "../components/Shared/Loading";

export default function TimeTable({ navigation }) {
  const {
    isLoading,
    userData: { courses },
  } = useMainScreenStore();

  console.table(courses);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <View>
      <MainScreenAppBar title={"Timetable"} />

      <ScrollView>
        <DataTable style={timetabale.base}>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={timetabale.timetableTitle}>Course</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={timetabale.timetableTitle}>Day</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={timetabale.timetableTitle}>Time</Text>
            </DataTable.Title>
          </DataTable.Header>

          {sortByWeekday(courses).map((item) => (
            <Card key={item.courseCode} style={timetabale.timetabaleCard}>
              <DataTable.Row>
                <DataTable.Cell>{item.courseCode}</DataTable.Cell>
                <DataTable.Cell>{item.day}</DataTable.Cell>
                <DataTable.Cell>
                  {item.timeStart} - {item.timeEnd}
                </DataTable.Cell>
              </DataTable.Row>
            </Card>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
}
