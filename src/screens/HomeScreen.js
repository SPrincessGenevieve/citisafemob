import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import GradientBackground from "../components/GradientBGR";
import ConstButton from "../components/ConstButton";
import { useFonts } from "expo-font";
import profile from "./../../assets/default_profile.png";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import NetInfo from '@react-native-community/netinfo'
import { setOnline } from "./Authentication/authSlice";
import { setEmptyFinalDriver } from "../components/camera/infoSlice";
import { setEmptyFinalVehicle, setEmptyextractedInfo } from "../components/camera/infoSliceCOR";

function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto Light": require("./../../assets/fonts/Roboto-Light.ttf"),
    "Montserrat Bold": require("./../../assets/fonts/Montserrat-Bold.ttf"),
  });
  const dispatch = useDispatch()

  const printer = useSelector((state) => state.auth.isPrinterConnected)

  const [cite, setCite] = useState(true);

  const user = useSelector((state) => state.auth.enforcer)
  const isOnline = useSelector((state) => state.auth.Online)

  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Function to update the current date
    const updateDate = () => {
      const now = new Date();
      const hours = now.getHours();

      let greetingText = '';
      if (hours >= 5 && hours < 12) {
        greetingText = 'Good morning,';
      } else if (hours >= 12 && hours < 17) {
        greetingText = 'Good afternoon,';
      } else {
        greetingText = 'Good evening,';
      }

      setGreeting(greetingText);

      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = daysOfWeek[now.getDay()];

      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthName = monthNames[now.getMonth()];

      const formattedDate = `${monthName} ${now.getDate()}, ${now.getFullYear()}`;
      const formattedDay = `${dayOfWeek}`
      setCurrentDate(formattedDate);
      setCurrentDay(formattedDay);
      
    };
    updateDate();

    const intervalId = setInterval(updateDate, 60000);

    return () => clearInterval(intervalId);
  }, []);




  if (!fontsLoaded) {
    return null;
  }

  const screenHeight = Dimensions.get("window").height;

  const handleRecord = () => {
    navigation.navigate("Records");
  };

  const handleIntroLicense = () => {
    dispatch(setEmptyFinalDriver());
    dispatch(setEmptyFinalVehicle());
    dispatch(setEmptyextractedInfo());    
    navigation.navigate("IntroLicense");
  };

  const handleForm = () => {
    dispatch(setEmptyFinalDriver());
    dispatch(setEmptyFinalVehicle());
    dispatch(setEmptyextractedInfo());    
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
          source={user.profile_picture ? { uri: user.profile_picture } : require('./../../assets/default_profile.png')}
          style={{
            position: "absolute",
            display: "flex",
            right: -20,
            marginTop: 55,
            width: 50, // Adjust width and height as needed
            height: 50,
            borderRadius: 25, // Optional: Add borderRadius for a circular image
          }}
        />


        </View>
        <View style={{ display: "flex", flexDirection: "row", marginRight: 15, }}>
          <Text
            style={{
              marginTop: "20%",
              color: "black",
              fontSize: 20,
              fontFamily: "Roboto Light",
            }}
          >
            {greeting}{" "}
            <Text
              style={{
                color: "#3E7C1F",
                fontSize: 20,
                fontFamily: "Roboto Light",
                fontWeight: "bold",
                textTransform: 'capitalize'
              }}
            >
              {user.first_name} {user.last_name}
            </Text>
          </Text>
        </View>

        {/* need to update */}
        <Text
          style={{
            color: "#3E7C1F",
            fontSize: 20,
            fontFamily: "Roboto Light",
          }}
        >
          {currentDay},{" "}
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontFamily: "Roboto Light",
            }}
          >
            {currentDate}
          </Text>
        </Text>
        {printer ? (
              <Text style={{
                color: "green",
                fontSize: 20,
                fontFamily: "Roboto Light",
              }}>Printer Connected</Text>
            ): (
              <Text style={{
                color: "red",
                fontSize: 20,
                fontFamily: "Roboto Light",
              }}>Printer Not Connected</Text>
            )}

      </View>
      {cite ? (
        <>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              marginTop: 250,
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
