import { ScrollView, View, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { color } from "../constants/colors";
import Logo from "../components/Shared/Logo";
const image = require("../assets/icons/left-arrow.png");
import {
  TextInput,
  Text,
  Button,
  Portal,
  Dialog,
  ActivityIndicator,
} from "react-native-paper";
import { createProfile } from "../styles/createProfile";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { courses } from "../data/courses";
import { useForm, Controller } from "react-hook-form";
import VisualModal from "../components/Shared/VisualModal";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../firebase/config";
import { getStoreData } from "../lib/storage";
import { route } from "../constants/route";
import { coursesData } from "../data/courseData";

export default function CreateProfile({ navigation }) {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();
  const [selected, setSelected] = useState([]);
  const [visible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalIsVisble, setModalIsVisble] = useState(false);

  const hideDialog = () => {
    setIsVisible(false);
  };

  // handle registration
  const handleCourseRegistration = async () => {
    setIsVisible(false);
    setIsSubmitting(true);
    const user = await getStoreData("user");

    let courses = [];
    for (let i = 0; i < selected.length; i++) {
      const foundCourse = coursesData.find(
        (item) => item.courseCode === selected[i]
      );
      courses = [...courses, foundCourse];
    }

    const { firstname, surname, matno, othername } = formData;

    const values = {
      firstname,
      surname,
      matno,
      othername,
      userId: user.userId,
      courses,
    };
    try {
      const collectionRef = collection(database, "users");
      await addDoc(collectionRef, values);
      setIsSubmitting(false);
      setModalIsVisble(true);
    } catch (error) {
      setIsSubmitting(false);
      Alert.alert("Somethng Wrong", "Please try again later");
    }
  };

  // handle course changes
  const handleCourseChange = (val) => {
    setSelected(val);
    setValue("courses", [...selected]);
  };

  const onPress = async (data) => {
    setFormData(data);
    setIsVisible(true);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Profile",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerBackImageSource: image,
      headerRight: () => <Logo />,
    });
  }, []);

  return (
    <ScrollView>
      <VisualModal
        modalIsVisible={modalIsVisble}
        text={"Course Registration was succesful"}
        onModalPress={() => navigation.replace(route.MainScreen)}
      />

      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Note</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Please be aware that you can not edit your data after
                registration. By clicking on{" "}
                <Text style={{ fontWeight: "bold", color: color.primary }}>
                  Continue
                </Text>
                , you agree that all your data are correct
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={hideDialog}
                mode="elevated"
                style={[
                  createProfile.button,
                  { marginRight: 10, width: "35%" },
                ]}
                // buttonColor={color.primary}
                rippleColor={color.white}
              >
                Cancel
              </Button>
              <Button
                onPress={handleCourseRegistration}
                mode="contained"
                style={[createProfile.button, { width: "60%" }]}
                buttonColor={color.primary}
                rippleColor={color.riplePrimary}
              >
                Continue
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View>
          <Text variant="titleLarge" style={createProfile.title}>
            Almost There! Set up your profile
          </Text>

          <View style={createProfile.input}>
            {errors.surname && (
              <Text style={{ color: color.danger }}>
                {" "}
                Please enter your surname
              </Text>
            )}
            <Controller
              name="surname"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Surname"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          <View style={createProfile.input}>
            {errors.firstname && (
              <Text style={{ color: color.danger }}>
                {" "}
                Please enter your firstname
              </Text>
            )}
            <Controller
              name="firstname"
              control={control}
              rules={{ required: true }}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  label="First name"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          <View style={createProfile.input}>
            <Controller
              name="othername"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  label="Other name"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          <View style={createProfile.input}>
            {errors.matno && (
              <Text style={{ color: color.danger }}>
                {" "}
                Please enter your matriculation number
              </Text>
            )}
            <Controller
              name="matno"
              control={control}
              rules={{ required: true }}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  label="Mat No"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="default"
                />
              )}
            />
          </View>

          <View style={createProfile.input}>
            {errors.courses && (
              <Text style={{ color: color.danger }}>
                {" "}
                Please Select your courses
              </Text>
            )}
            <Controller
              control={control}
              name="courses"
              rules={{ required: true }}
              render={({}) => (
                <MultipleSelectList
                  setSelected={(val) => handleCourseChange(val)}
                  data={courses}
                  save="value"
                  label="Courses"
                  placeholder="Select your courses"
                  badgeStyles={{
                    backgroundColor: color.primary,
                  }}
                />
              )}
            />
          </View>

          <View style={createProfile.buttonContainer}>
            {isSubmitting ? (
              <Button
                mode="contained"
                style={createProfile.button}
                uppercase
                shouldRasterizeIOS
                buttonColor={color.primary}
                rippleColor={color.riplePrimary}
              >
                <ActivityIndicator
                  animating={true}
                  color={color.white}
                  size={28}
                />
              </Button>
            ) : (
              <Button
                onPress={handleSubmit(onPress)}
                mode="contained"
                style={createProfile.button}
                uppercase
                buttonColor={color.primary}
                rippleColor={color.riplePrimary}
              >
                Submit
              </Button>
            )}
          </View>
          <Button onPress={navigation.replace(route.MainScreen)}>Fast</Button>
        </View>
      </View>
    </ScrollView>
  );
}
