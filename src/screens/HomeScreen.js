import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import GradientBackground from "../components/GradientBGR";
import ConstButton from "../components/ConstButton";
import { useFonts } from "expo-font";
import profile from "./../../assets/default_profile.png";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto Light": require("./../../assets/fonts/Roboto-Light.ttf"),
    "Montserrat Bold": require("./../../assets/fonts/Montserrat-Bold.ttf"),
  });

  const [cite, setCite] = useState(true);

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

      <View
        style={{
          top: 1,
          position: "absolute",
          width: "80%",
        }}
      >
        <View>
          <Image
            source={profile}
            style={{
              position: "absolute",
              display: "flex",
              right: -10,
              marginTop: 65,
            }}
          ></Image>
        </View>
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
      {cite ? (
        <>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              marginTop: "100%",
            }}
          >
            <ConstButton
              onPress={() => setCite(!cite)}
              name="scan1"
              title="Cite Ticket"
              marginLeftText={10}
              height={60}
            ></ConstButton>
            <ConstButton
              onPress={handleRecord}
              name="file1"
              title="Check Logs"
              marginLeftText={10}
              height={60}
            ></ConstButton>
          </View>
        </>
      ) : (
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            backgroundColor: "white",
          }}
        >
          <View style={{ position: "absolute", top: 30, left: 30 }}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Icon
                size={35}
                name="arrowleft"
                onPress={() => setCite(!cite)}
              ></Icon>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
            }}
          >
            <ConstButton
              onPress={handleIntroLicense}
              name="scan1"
              title="Use OCR"
              marginLeftText={10}
              height={60}
            ></ConstButton>
            <ConstButton
              onPress={handleForm}
              name="form"
              marginLeftText={10}
              title="Manual Entry"
              height={60}
            ></ConstButton>
          </View>
        </View>
      )}
    </View>
  );
}

export default HomeScreen;
