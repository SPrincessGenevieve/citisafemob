import React, { useState, useRef } from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import GradientBackground from "../components/GradientBGR";
import ConstButton from "../components/ConstButton";
import { useFonts } from "expo-font";

function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto Light": require("./../../assets/fonts/Roboto-Light.ttf"),
    "Montserrat Bold": require("./../../assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const screenHeight = Dimensions.get("window").height;

  const handleRecord = () => {
    navigation.navigate("Records");
  };

  const handleIntroLicense = () => {
    navigation.navigate("IntroLicense");
  };

  const handleForm = () => {
    navigation.navigate("FormScreen");
  };

  const handleLogout = () => {
    navigation.navigate("FirstScreen");
  };

  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GradientBackground></GradientBackground>
      <View></View>
      <View
        style={{
          top: 1,
          position: "absolute",

          width: "80%",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              marginTop: "20%",
              color: "black",
              fontSize: 20,
              fontFamily: "Roboto Light",
            }}
          >
            Good morning,{" "}
            <Text
              style={{
                color: "#3E7C1F",
                fontSize: 20,
                fontFamily: "Roboto Light",
                fontWeight: "bold",
              }}
            >
              John
            </Text>
          </Text>
        </View>

        <Text
          style={{
            color: "#3E7C1F",
            fontSize: 20,
            fontFamily: "Roboto Light",
          }}
        >
          Monday,{" "}
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontFamily: "Roboto Light",
            }}
          >
            September 25, 2023
          </Text>
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          marginTop: "40%",
        }}
      >
        <ConstButton
          onPress={handleRecord}
          name="book"
          title="Check Records"
        ></ConstButton>
        <ConstButton
          onPress={handleIntroLicense}
          name="scan1"
          title="Scan Driver's License and OR/CR"
        ></ConstButton>
      </View>
    </View>
  );
}

export default HomeScreen;
