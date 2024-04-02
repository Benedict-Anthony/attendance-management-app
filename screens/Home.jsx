import { View, Image, ScrollView } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";

const homeImage = require("../assets/images/home.png");
import { Button, Card, Text } from "react-native-paper";

import { home } from "../styles/home.styles";
import { features } from "../data/features";
import { color } from "../constants/colors";
import { route } from "../constants/route";
import { getStoreData } from "../lib/storage";
export default function Home({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const checkUser = async () => {
      const user = await getStoreData("user");
      if (user) return navigation.replace(route.MainScreen);
    };
    checkUser();
  }, []);
  return (
    <ScrollView style={{ flex: 1, paddingBottom: 10 }}>
      <View style={home.base}>
        <Card style={{ borderRadius: 150, marginVertical: 20 }}>
          <View className="flex-1">
            <Image source={homeImage} style={home.homeImage} />
          </View>
        </Card>
        <Card style={{ paddingHorizontal: 10 }}>
          {features.map((item) => (
            <Card style={home.homeCard} key={item.icon}>
              <Card.Content>
                <Text
                  variant="titleLarge"
                  style={{ color: color.primary, fontWeight: "700" }}
                >
                  {item.title} {item.icon}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ fontSize: 16, marginTop: 7 }}
                >
                  {item.description}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </Card>

        <Button
          style={home.homeButton}
          mode="contained"
          icon={"account-arrow-right"}
          buttonColor={color.primary}
          rippleColor={color.riplePrimary}
          uppercase={true}
          shouldRasterizeIOS={true}
          onPress={() => navigation.navigate(route.Login)}
        >
          Get Started
        </Button>
      </View>
    </ScrollView>
  );
}
