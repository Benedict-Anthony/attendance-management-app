import { View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { login } from "../styles/login";
import {
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  MD2Colors,
  Checkbox,
} from "react-native-paper";
import { color } from "../constants/colors";
import Logo from "../components/Shared/Logo";
import { route } from "../constants/route";
const image = require("../assets/icons/left-arrow.png");
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { getStoreData, storeData } from "../lib/storage";

export default function Login({ navigation }) {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onPress = async (data) => {
    const { email, password } = data;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const value = { userId: response.user.uid, email: response.user.email };

      storeData("user", value);
      reset();
      navigation.replace(route.MainScreen);
    } catch (error) {
      setError("email", {
        message: "Invalid email or password.",
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Welcome",
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
      if (user) {
        navigation.replace(route.MainScreen);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);
  return (
    <View style={login.base}>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={color.primary}
          size="large"
          style={{ marginTop: 40 }}
        />
      ) : (
        <View style={login.formGroup}>
          <Text
            variant="headlineMedium"
            style={{ marginBottom: 15, color: color.primary, fontWeight: 700 }}
          >
            Login to Continue
          </Text>
          <View>
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
                  message: "This field is required",
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
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            {errors.password && (
              <Text style={{ color: color.danger }}>
                {" "}
                {errors.password.message}
              </Text>
            )}
            <Controller
              name="password"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
              }}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  label="Password"
                  mode="outlined"
                  secureTextEntry={!checked}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
          <View style={login.showPassword}>
            <Text variant="bodyLarge">Show Password</Text>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>

          {isSubmitting ? (
            <Button
              mode="contained"
              style={login.loginButton}
              uppercase
              shouldRasterizeIOS
              buttonColor={color.primary}
              rippleColor={color.riplePrimary}
            >
              <ActivityIndicator
                animating={true}
                color={MD2Colors.white}
                size={28}
              />
            </Button>
          ) : (
            <Button
              mode="contained"
              style={login.loginButton}
              uppercase
              shouldRasterizeIOS
              buttonColor={color.primary}
              rippleColor={color.riplePrimary}
              onPress={handleSubmit(onPress)}
            >
              Login
            </Button>
          )}

          <View style={login.navigation}>
            <Text variant="bodyLarge">Don't have an account</Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate(route.SignIn)}
            >
              Sign up
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
