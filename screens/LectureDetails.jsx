import { View } from "react-native";
import { Text, Card, Button, Portal, Dialog } from "react-native-paper";
import React, { useEffect, useLayoutEffect, useState } from "react";
import MainScreenAppBar from "../components/Shared/MainScreenAppBar";
import { PulseIndicator, SkypeIndicator } from "react-native-indicators";
import { lectureDetails } from "../styles/lectureDetails";
import { currentTime, getDayOfTheWeek, getToday } from "../lib/formateDate";
import { color } from "../constants/colors";
import { getStartHour } from "../lib/getHours";
import { getStoreData, removeData, storeData } from "../lib/storage";
import VisualModal from "../components/Shared/VisualModal";
import { createProfile } from "../styles/createProfile";
import { route as rt } from "../constants/route";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../firebase/config";

export default function LectureDetails({ navigation, route }) {
  const course = route.params.course;
  const matno = route.params.matno;
  const fullName = route.params.fullName;

  const { currentHour, meridiem } = getStartHour();

  const [classIsOnSession, setClassIsOnSession] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [modalIsVisble, setModalIsVisble] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progressText, setProgressText] = useState("Please wait");

  const startHour = `${currentHour}${meridiem}`;
  const currentDay = getDayOfTheWeek();
  const noClassText =
    currentDay !== course.day && course.timeStart !== startHour
      ? "this class is not scheduled for today"
      : currentDay == course.day && course.timeStart !== startHour
      ? "This class is not schedule for this time"
      : "";

  const startClassSession = async () => {
    setClassIsOnSession(true);
    await storeData(`session-${course.courseCode}`, {
      startTime: currentTime(),
    });
  };

  const endClassSession = async () => {
    setClassIsOnSession(false);
    setIsVisible(true);
  };

  const handleAttendance = async () => {
    setIsVisible(false);
    setIsSubmitting(true);
    setProgressText("Taking attendance");
    try {
      const user = await getStoreData("user");
      const collectionRef = collection(database, "attendance");
      const session = await getStoreData(`session-${course.courseCode}`);
      const data = {
        timeStart: session.startTime,
        timeEnd: currentTime(),
        fullName,
        courseTitle: course.courseTitle,
        matno,
        day: `${getDayOfTheWeek()}, ${getToday()}`,
        userId: user.userId,
      };
      await addDoc(collectionRef, data);
      setProgressText("Attendance Taken!!!");
      await removeData(`session-${course.courseCode}`);
      setProgressText("");
      setIsSubmitting(false);
      setModalIsVisble(true);
    } catch (error) {
      console.log(error);
    }
  };
  const hideDialog = () => {
    setIsVisible(false);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const checkClassSession = async () => {
      const session = await getStoreData(`session-${course.courseCode}`);
      if (session) {
        setClassIsOnSession(true);
      }
    };

    checkClassSession();
  }, []);
  return (
    <View style={lectureDetails.baseContainer}>
      <MainScreenAppBar title={route.params.name} />

      <VisualModal
        modalIsVisible={modalIsVisble}
        text={"Attendance successfully taken"}
        onModalPress={() => navigation.replace(rt.MainScreen)}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Note</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Confirm attendance</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={hideDialog}
              mode="elevated"
              style={[createProfile.button, { marginRight: 10, width: "35%" }]}
              // buttonColor={color.primary}
              rippleColor={color.white}
            >
              Cancel
            </Button>
            <Button
              onPress={handleAttendance}
              mode="contained"
              style={[createProfile.button, { width: "60%" }]}
              buttonColor={color.primary}
              rippleColor={color.riplePrimary}
            >
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {isSubmitting ? (
        <View style={lectureDetails.progress}>
          <SkypeIndicator color={color.primary} size={50} />
          <Text style={lectureDetails.progressText}>{progressText}</Text>
        </View>
      ) : (
        <View style={lectureDetails.base}>
          <Card style={lectureDetails.card}>
            {classIsOnSession && (
              <PulseIndicator
                style={lectureDetails.pulse}
                color={color.primary}
                size={30}
                animating
              />
            )}
            <Card.Content>
              <Text variant="titleLarge" style={lectureDetails.cardTitle}>
                {course.courseTitle}{" "}
                <Text style={lectureDetails.cardTitleCode}>
                  ({course.courseCode})
                </Text>
              </Text>
              <Text variant="titleMedium" style={lectureDetails.cardDay}>
                {getDayOfTheWeek()}, {getToday()}
              </Text>
              <Text variant="titleSmall" style={lectureDetails.cardDay}>
                Time: {course.timeStart} - {course.timeEnd}
              </Text>
            </Card.Content>
            <Card.Actions>
              {startHour !== course.timeStart ? (
                <View style={{ paddingVertical: 10 }}>
                  {classIsOnSession ? (
                    <Button
                      style={lectureDetails.cardButton}
                      buttonColor={color.primary}
                      rippleColor={color.riplePrimary}
                      textColor={color.white}
                      onPress={endClassSession}
                    >
                      End Class
                    </Button>
                  ) : (
                    <Button
                      style={lectureDetails.cardButton}
                      buttonColor={color.primary}
                      rippleColor={color.riplePrimary}
                      textColor={color.white}
                      uppercase
                      onPress={startClassSession}
                    >
                      Start Class
                    </Button>
                  )}
                </View>
              ) : (
                <Button
                  mode="elevated"
                  style={lectureDetails.cardButton}
                  buttonColor={color.white}
                  rippleColor={color.gray}
                  onPress={() => navigation.goBack()}
                >
                  {noClassText}
                </Button>
              )}
            </Card.Actions>
          </Card>
        </View>
      )}
    </View>
  );
}
