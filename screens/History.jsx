import { FlatList, Pressable, Modal, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import MainScreenAppBar from "../components/Shared/MainScreenAppBar";
import { useMainScreenStore } from "../context/MainScreenContext";
import Loading from "../components/Shared/Loading";
import { Card, Text, IconButton } from "react-native-paper";
import { history } from "../styles/history";
import { Button } from "react-native-paper";
// import Modal from "react-native-modal";
import { color } from "../constants/colors";

export default function History({ navigation }) {
  const { isLoading, userAttendance } = useMainScreenStore();
  const [singleAttendance, setSingleAttendance] = useState({});
  const [modalIsVisble, setModalIsVisble] = useState(false);

  const handleDetailView = (id) => {
    const attendance = userAttendance.find((item) => item.id === id);
    setSingleAttendance(attendance);
    setModalIsVisble(true);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  if (isLoading) return <Loading />;
  return (
    <View style={[history.base]}>
      <MainScreenAppBar title={"Attendance History"} />
      <Modal
        animationType="slide"
        visible={modalIsVisble}
        backdropColor={color.primary}
        backdropOpacity={0.9}
      >
        <View style={history.historyModal}>
          <Text style={history.modalTitle} variant="titleLarge">
            {singleAttendance.courseTitle}
          </Text>
          <Text style={history.modalsbubTitle}>{singleAttendance.day}</Text>
          <Text variant="bodyMedium" style={history.modalsbubTitle}>
            {singleAttendance.timeStart}-{singleAttendance.timeEnd}
          </Text>
        </View>
        <IconButton
          icon={"close"}
          style={history.modalBuuton}
          onPress={() => setModalIsVisble(false)}
          mode="contained"
        />
      </Modal>
      <FlatList
        data={userAttendance}
        keyExtractor={(item) => item.id}
        renderItem={(data) => (
          <Pressable onPress={() => handleDetailView(data.item.id)}>
            <Card style={history.card}>
              <Card.Content>
                <Text variant="titleLarge" style={history.cardTitle}>
                  {data.item.courseTitle}
                </Text>
                <Text style={history.cardDay}>{data.item.day}</Text>
                <Text variant="bodyMedium">
                  {data.item.timeStart}-{data.item.timeEnd}
                </Text>
              </Card.Content>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
}
