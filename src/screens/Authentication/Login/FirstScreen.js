import React, { useState, useEffect, Children } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import GradientBackground from "../../../components/GradientBG";
import { useFonts } from "expo-font";
import ConstInput from "../../../components/ConstInput";
import ConstInputVisible from "../../../components/ConstInputVisible";
import KeyboardWithoutWrapper from "../../../components/KeyboardWithoutWrapper";
import ConstButton from "../../../components/ConstButton";
import Title from "../../../components/Title";
import TextButton from "../../../components/TextButton";
import axios from '../../../../plugins/axios'
import { useDispatch } from "react-redux";
import { setEnforcer, setToken } from "../authSlice";


function FirstScreen({ navigation }) {
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    "Zen Dots Regular": require("./../../../../assets/fonts/ZenDots-Regular.ttf"),
  });
  const [showPassword, setShowPassword] = useState(true);
  const [textInputFocused, setTextInputFocused] = useState(false);
  const [animationValue] = useState(new Animated.Value(1));

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleLogin = () => {
    navigation.navigate("HomeScreen");

    axios.post("accounts/token/login/", credentials).then((response) => {

      const token = response.data.auth_token
      dispatch(setToken(token));

      axios.get('accounts/users/me/', {
        headers: {
          Authorization: `token ${token}`
        }
      }).then((response) => {

        const role = response.data.role
        const last_name = response.data.last_name

        dispatch(setEnforcer(response.data))

        if (role != 'ENFORCER'){
          alert(`Sir ${last_name}, Your Role is ${role}`)
          setCredentials({
            username: '',
            password: ''
          })
        }else {
          alert(`Welcome to eTCMF ${role} - ${last_name}`)
          navigation.navigate("HomeScreen");
        }

      })

    })


  };
  const handleForgotPass = () => {
    navigation.navigate("ForgotPass");
  };


  if (!fontsLoaded) {
    return null;
  }


  return (
    <KeyboardWithoutWrapper>
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GradientBackground></GradientBackground>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text
                style={{ fontSize: 72, fontWeight: "bold", color: "#285712" }}
              >
                eTC
              </Text>
              <Text
                style={{ fontSize: 72, fontWeight: "bold", color: "#61680C" }}
              >
                MF
              </Text>
            </View>
            <Text style={{ marginTop: -15, color: "#353904" }}>
              e-Ticketing Citation Manolo Fortich
            </Text>
          </View>

          <View
            style={{
              width: "80%",
              marginTop: -30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Title></Title>

            <ConstInput borderRadius={10} placeholder="username" value={credentials.username} onChangeText={(text) => {
              setCredentials({
                ...credentials, username: text
              })
            }}></ConstInput>
            <ConstInputVisible placeholder="password" value={credentials.password} onChangeText={(text) => {
              setCredentials({
                ...credentials, password: text
              })
            }}></ConstInputVisible>
            <TextButton onPress={handleForgotPass}></TextButton>
            <View style={{ width: "100%", marginTop: 20 }}>
              <ConstButton
                height={60}
                title="Login"
                marginLeftText={-10}
                onPress={handleLogin}
                borderRadius={10}
              ></ConstButton>
            </View>
          </View>
        </View>
      </View>
    </KeyboardWithoutWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    height: 900,
  },
});

export default FirstScreen;
