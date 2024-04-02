import { View, ScrollView, Alert } from "react-native";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { color } from "../constants/colors";
import Logo from "../components/Shared/Logo";
import { signin } from "../styles/signin";

import {
  TextInput,
  Text,
  Button,
  Dialog,
  Portal,
  ActivityIndicator,
} from "react-native-paper";
import { route } from "../constants/route";
import { createProfile } from "../styles/createProfile";
const image = require("../assets/icons/left-arrow.png");

import { Controller, useForm } from "react-hook-form";
import Modal from "../components/Shared/VisualModal";
import VisualModal from "../components/Shared/VisualModal";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { getStoreData, storeData } from "../lib/storage";

export default function SignIn({ navigation }) {
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const [visible, setVisible] = useState(false);
  const [modalIsVisble, setModalIsVisble] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [data, setData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onPress = async (formData) => {
    setData(formData);
    showDialog();
  };

  const handleSigning = async () => {
    setIsSubmitting(true);
    hideDialog();
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const response = await signInWithEmailAndPassword(auth, email, password);
      const value = { userId: response.user.uid, email: response.user.email };
      storeData("user", value);
      setModalIsVisble(true);
    } catch (error) {
      Alert.alert(
        "Something went wrong",
        "Please check your credential and your internet connections"
      );
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Sign Up",
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.primary,
      },
      headerBackImageSource: image,
      headerRight: () => <Logo />,
    });
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const user = await getStoreData("user");
      if (user.userId) {
        navigation.replace(route.MainScreen);
      }
    };

    checkAuthStatus();
  }, []);
  return (
    <Fragment>
      {modalIsVisble ? (
        <VisualModal
          modalIsVisible={true}
          text={"Registration was successful"}
          onModalPress={() => navigation.replace(route.CreateProfile)}
        />
      ) : (
        <View style={signin.base}>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Please be aware that this app is strictly for 400 level
                  computer science student. By signing up for account, you are
                  therefore assumed to be a 400 level computer science student.
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
                  onPress={handleSigning}
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
          <ScrollView style={{ flex: 1 }}>
            <Text variant="headlineMedium" style={signin.title}>
              Sign up for an account
            </Text>
            <View style={signin.input}>
              {errors.email && (
                <Text style={{ color: color.danger }}>
                  {" "}
                  {errors.email.message}
                </Text>
              )}
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your email",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                name="email"
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextInput
                    label="Email"
                    mode="outlined"
                    right={
                      <TextInput.Icon icon="email" color={color.primary} />
                    }
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
            <View style={signin.input}>
              {errors.password && (
                <Text style={{ color: color.danger }}>
                  {" "}
                  {errors.password.message}
                </Text>
              )}
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "please enter your password",
                  },
                  minLength: {
                    value: 6,
                    message: "password should be at least six characters",
                  },
                }}
                name="password"
                render={({ field: { onBlur, value, onChange } }) => (
                  <TextInput
                    mode="outlined"
                    label="Password"
                    secureTextEntry
                    right={<TextInput.Icon icon="eye" color={color.primary} />}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
            <View style={signin.input}>
              {errors.comfirm_password && (
                <Text style={{ color: color.danger }}>
                  {" "}
                  {errors.comfirm_password.message}
                </Text>
              )}
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "please enter your password",
                  },
                  validate: {
                    validateConfirmPassword: () => {
                      if (
                        getValues("password") !== getValues("comfirm_password")
                      ) {
                        return `password does not macth`;
                      }
                      return true;
                    },
                  },

                  minLength: {
                    value: 6,
                    message: "password should be at least six characters",
                  },
                }}
                name="comfirm_password"
                render={({ field: { onBlur, value, onChange } }) => (
                  <TextInput
                    mode="outlined"
                    label="Confirm Password"
                    secureTextEntry
                    right={<TextInput.Icon icon="eye" color={color.primary} />}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
            <View style={signin.buttonContainer}>
              {isSubmitting ? (
                <Button
                  mode="elevated"
                  uppercase
                  style={signin.button}
                  buttonColor={color.primary}
                >
                  <ActivityIndicator
                    animating={true}
                    shouldRasterizeIOS
                    color={color.white}
                    size={25}
                  />
                </Button>
              ) : (
                <Button
                  mode="contained"
                  uppercase
                  onPress={handleSubmit(onPress)}
                  style={signin.button}
                  buttonColor={color.primary}
                  rippleColor={color.riplePrimary}
                >
                  Sign up
                </Button>
              )}
            </View>
            <View style={signin.navigation}>
              <Text variant="bodyLarge">Already have an account?</Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate(route.Login)}
              >
                Login
              </Button>
            </View>
          </ScrollView>
        </View>
      )}
    </Fragment>
  );
}
